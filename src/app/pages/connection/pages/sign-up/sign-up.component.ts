import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'
import { ApiUserService, IUserResponse } from '../../../../service/api-user.service'
import { LocalstorageService } from '../../../../service/localstorage.service'
import { RDXRootState, NgRedux, FETCH_USER, FETCH_SEO_DATA } from '../../../../store'

@Component({
  selector: 'spm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  private _subValueChangePassword:Subscription

  private _isSubmit:boolean = false

  public formSignUp:FormGroup
  public responseRequest:string
  public classResponseRequest:string

  constructor(
    private _formBuilder:FormBuilder,
    private _apiUser:ApiUserService,
    private _redux:NgRedux<RDXRootState>,
    private _localStorageService:LocalstorageService,
    private _router:Router
  ){}

  ngOnInit() {
    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'signUp' })
    this.formSignUp = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(31), Validators.minLength(4)], this._asyncUserNameAlreadyExist.bind(this) ],
      email: ['', [Validators.required, Validators.email], this._asyncEmailAlreadyExist.bind(this) ],
      password: ['', [Validators.required, Validators.pattern(`(?=.*[A-Za-z])(?=.*\\d).{8,}`), Validators.maxLength(31)]],
      passwordRepeat: ['', [Validators.required]],
      mailing: [true, []],
      terms: [false, [Validators.required]]
    },{
      // validator: this._passwordMatch('password', 'passwordRepeat')
    })
    this.formSignUp.get('passwordRepeat').setValidators(this._isPasswordMatch(<FormControl>this.formSignUp.get('password'), <FormControl>this.formSignUp.get('passwordRepeat')))
    this._subValueChangePassword = this.formSignUp.get('password').valueChanges.subscribe((value:any) => {
      this.formSignUp.get('passwordRepeat').setValue('')
      this.formSignUp.get('passwordRepeat').markAsPristine()
    })
  }

  ngOnDestroy(){
    if (this._subValueChangePassword) { this._subValueChangePassword.unsubscribe() }
  }

  // private _passwordMatch(PasswordName: string, passwordRepeatName: string): ValidatorFn {
  //   return (group: FormGroup): {[key: string]: any} => {
  //     let target = group.get(PasswordName)
  //     let toMatch = group.get(passwordRepeatName)
  //     let testMatch = target.valid && toMatch.value.length > 0 && target.value !== toMatch.value ? { passwordMatch: true } : null
  //     // !testMatch ? this._passwordMatchState
  //     this._passwordMatchState.state = !testMatch ? true : false
  //     // console.log(this._passwordMatchState, testMatch)
  //     return testMatch
  //   }
  // }

  private _isPasswordMatch(password:FormControl, match:FormControl):ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } => {
      return match.value && password.value &&match.value.length > 0 && password.value !== match.value ? { passwordMatch: true } : null
    }
  }

  private _asyncUserNameAlreadyExist(control: FormControl): Promise<any> | Observable<any> {
    let self = this
    const promise = new Promise<any>(function(resolve, reject){
      self._apiUser.registerInfoAlredyExist("login", control.value)
      .subscribe((response:{exist:boolean}) => {
        response.exist ? resolve({ 'alreadyExist': true}) : resolve(null)
      })
    })
    return promise;
  }

  private _asyncEmailAlreadyExist(control: FormControl): Promise<any> | Observable<any> {
    let self = this
    const promise = new Promise<any>(function(resolve, reject){
      self._apiUser.registerInfoAlredyExist("email", control.value)
      .subscribe((response:{exist:boolean}) => {
        response.exist ? resolve({ 'alreadyExist': true}) : resolve(null)
      })
    })
    return promise;
  }

  public errorFormControlByName(controlName:string, errorName:string):boolean {
    return this._isSubmit
    ? this.formSignUp.get(controlName).hasError(errorName)
    : this.formSignUp.get(controlName).hasError(errorName) && this.formSignUp.get(controlName).dirty
  }

  public errorFormByName(errorName:string):boolean {
    return this._isSubmit
    ? this.formSignUp.hasError(errorName)
    : this.formSignUp.hasError(errorName) && this.formSignUp.dirty
  }

  public onSubmitSignUp(){
    this._isSubmit = true
    let params = this.formSignUp.value;
    this._apiUser.register({ login: params.username, email: params.email, password: params.password, mailing: params.mailing })
    .subscribe((response:IUserResponse) => {
      this._localStorageService.login(response.token, response.user._id)
      this._redux.dispatch({ type: FETCH_USER, user: response.user })
      this._router.navigate(['profile'])
    }, (error:any) => {
      this.responseRequest = error
      this.classResponseRequest = 'error-request'
    })
  }
}
