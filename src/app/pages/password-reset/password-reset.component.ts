import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, RDXRootState, FETCH_SEO_DATA, FETCH_USER, Subscription } from '../../store'
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ApiUserService, IUserResponse } from '../../service/api-user.service'
import { LocalstorageService } from '../../service/localstorage.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'spm-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

	public passwordResetToken:String
  public formSettings:FormGroup
  public responseRequest:string
  public classResponseRequest:string
  public authorizedStep:boolean

  private _subUser:Subscription
  private _isSubmit:boolean

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _formBuilder:FormBuilder,
    private _localStorageService:LocalstorageService,
    private _apiUser:ApiUserService
  ) { }

  ngOnInit() {
  	this._activatedRoute.queryParams.subscribe((data:any) => {
      this._subUser = this._apiUser.checkPasswordResetAuth(data.token).subscribe(
        (data:any) => {
          this.authorizedStep = true
        },(error:any) => {
          this.authorizedStep = false
      })
    })

    this.formSettings = this._formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(`(?=.*[A-Za-z])(?=.*\\d).{8,}`)]],
      newPasswordRepeat: ['', [Validators.required]]
    })

    this.formSettings.get('newPasswordRepeat').setValidators(this._isPasswordMatch(<FormControl>this.formSettings.get('newPassword'), <FormControl>this.formSettings.get('newPasswordRepeat')))
  }

  ngOnDestroy(){
    if (this._subUser) { this._subUser.unsubscribe() }
  }

  private _isPasswordMatch(password:FormControl, match:FormControl):ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } => {
      return match.value.length > 0 && password.value !== match.value ? { passwordMatch: true } : null
    }
  }

  public onSubmitContact() {
    this._isSubmit = true;
    this._subUser = this._apiUser.ForgetPasswordReset(this.formSettings.value.newPassword)
    .subscribe((data:IUserResponse) => {
      this._localStorageService.login(data.token, data.user._id)
      this._redux.dispatch({ type: FETCH_USER, user: data.user })
      this.responseRequest = 'password successfully updated'
      this.classResponseRequest = 'success-request'
    }, (err:any) => {
      this.responseRequest = err
      this.classResponseRequest = 'error-request'
    })
  }

  public errorFormControlByName(controlName:string, errorName:string):boolean {
    return this._isSubmit
    ? this.formSettings.get(controlName).hasError(errorName)
    : this.formSettings.get(controlName).hasError(errorName) && this.formSettings.get(controlName).dirty
  }

}
