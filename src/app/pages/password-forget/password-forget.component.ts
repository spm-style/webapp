import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ApiUserService } from '../../service/api-user.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'spm-password-forget',
  templateUrl: './password-forget.component.html',
  styleUrls: ['./password-forget.component.scss']
})
export class PasswordForgetComponent implements OnInit {

  @ViewChild("buttonSubmit") private _buttonSubmit:ElementRef

  public formForgetPassword:FormGroup
  public statusEmail:{msg:string, className:string} = { msg:"", className:null }

  private _isSubmit:boolean = false

  constructor(
  	private _formBuilder:FormBuilder,
  	private _apiUser:ApiUserService
  ) { }

  ngOnInit(){
  	this.formForgetPassword = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  public onSubmitContact() {
    this._isSubmit = true
    if(this.formForgetPassword.valid){
      this._apiUser.passwordResetToken(this.formForgetPassword.value.email)
      .subscribe((response:any) => {
        if(response.status == "success") {
          this.statusEmail = {
            msg: `An email is going to be sent to ${this.formForgetPassword.value.email}, it may arrive in your spam mailbox. Make sure you check it !`,
            className: "success"
          }
          this._isSubmit = false
          this._buttonSubmit.nativeElement.focus()
          this.formForgetPassword.reset()
        }else if(response.status == "email-invalid"){
          this.statusEmail = {
            msg: `email: ${this.formForgetPassword.value.email} is invalid.`,
            className: "invalid"
          }
        }else if(response.status == "user-inactive"){
          this.statusEmail = {
            msg: `user with email ${this.formForgetPassword.value.email} is ${response.userState}.`,
            className: "user-inactive"
          }
          this._isSubmit = false
          this._buttonSubmit.nativeElement.focus()
          this.formForgetPassword.reset()
        }
      },(error:any) => {
        console.log(error)
      })
    }
  }

  public errorFormControlByName(controlName:string, errorName:string):boolean {
    return this._isSubmit
    ? this.formForgetPassword.get(controlName).hasError(errorName)
    : this.formForgetPassword.get(controlName).hasError(errorName) && this.formForgetPassword.get(controlName).dirty
  }
}
