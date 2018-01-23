import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE, FETCH_USER, Subscription } from '../../../../store'
import { ApiUserService, IUserResponse } from '../../../../service/api-user.service'
import { LocalstorageService } from '../../../../service/localstorage.service'

@Component({
  selector: 'spm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

	public formSettings:FormGroup
  public responseRequest:string
  public classResponseRequest:string
  private _subUser:Subscription
  private _isSubmit:boolean = false

  constructor(
    private _formBuilder:FormBuilder,
    private _redux:NgRedux<RDXRootState>,
    private _apiUser:ApiUserService,
    private _localStorageService:LocalstorageService
  ) { }

  ngOnInit() {
    this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'settings' })

  	this.formSettings = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
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
    let login = this._redux.getState().user.login
    this._subUser = this._apiUser.updateUserCredentials({
      login,
      password: this.formSettings.value.oldPassword,
      newPassword: this.formSettings.value.newPassword})
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
