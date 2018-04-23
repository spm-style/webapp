import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  public authorizedStep:boolean = true


  private _isSubmit:boolean

  @ViewChild("buttonSubmit") private _buttonSubmit:ElementRef

  private _token:string

  public statusResetPassword:{msg:string, className:string} = {msg:null, className:null}

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _formBuilder:FormBuilder,
    private _localStorageService:LocalstorageService,
    private _apiUser:ApiUserService
  ) { }

  ngOnInit() {
  	this._activatedRoute.queryParams.subscribe((query:any) => { this._token = query.token})

    this.formSettings = this._formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(`(?=.*[A-Za-z])(?=.*\\d).{8,}`)]],
      newPasswordRepeat: ['', [Validators.required]]
    })
    this.formSettings.get('newPasswordRepeat').setValidators(this._isPasswordMatch(<FormControl>this.formSettings.get('newPassword'), <FormControl>this.formSettings.get('newPasswordRepeat')))
  }

  private _isPasswordMatch(password:FormControl, match:FormControl):ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } => {
      return match.value && password.value &&match.value.length > 0 && password.value !== match.value ? { passwordMatch: true } : null
    }
  }

  public onSubmitContact() {
    if(this.formSettings.valid){
      if(!this._token){
        this.statusResetPassword = {
          msg: "The token is missing, retry the link in the mail, if the error persists, re-apply",
          className: "invalid"
        }
      }else{
        this._isSubmit = true
        this._apiUser.passwordReset(this.formSettings.value.newPassword, this._token)
        .subscribe((response:any) => {
          if(response.status == "success") {
            this._localStorageService.login(response.token, response.user._id)
            this._redux.dispatch({ type: FETCH_USER, user: response.user })
            this.statusResetPassword = {
              msg: `Success to reset password`,
              className: "success"
            }
            this._isSubmit = false
            this._buttonSubmit.nativeElement.focus()
            this.formSettings.reset()
          }else if(response.status == "user-inactive"){
            this.statusResetPassword = {
              msg: `user with email ${this.formSettings.value.email} is ${response.userState}.`,
              className: "user-inactive"
            }
            this._isSubmit = false
            this._buttonSubmit.nativeElement.focus()
            this.formSettings.reset()
          }
        },(error:any) => {
        if(error.statusCode == 401 || error.statusCode == 400){
          this.statusResetPassword = {
            msg: "The link to reset the password is expired",
            className: "invalid"
          }
          this._isSubmit = false
          this._buttonSubmit.nativeElement.focus()
          this.formSettings.reset()
        }else{
        }
      })
      }
    }
  }

  public errorFormControlByName(controlName:string, errorName:string):boolean {
    return this._isSubmit
    ? this.formSettings.get(controlName).hasError(errorName)
    : this.formSettings.get(controlName).hasError(errorName) && this.formSettings.get(controlName).dirty
  }

}
