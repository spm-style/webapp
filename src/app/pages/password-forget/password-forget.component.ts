import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ApiUserService } from '../../service/api-user.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'spm-password-forget',
  templateUrl: './password-forget.component.html',
  styleUrls: ['./password-forget.component.scss']
})
export class PasswordForgetComponent implements OnInit, OnDestroy {

  public formForgetPassword:FormGroup
  public responseRequest:string
  public classResponseRequest:string

  private _isSubmit:boolean = false
  private _subUser:Subscription

  constructor(
  	private _formBuilder:FormBuilder,
  	private _apiUser:ApiUserService
  ) { }

  ngOnInit(){
  	this.formForgetPassword = this._formBuilder.group({
      email: ['', [Validators.email]]
    })
  }

  ngOnDestroy(){
  	if (this._subUser) { this._subUser.unsubscribe() }
  }

  public onSubmitContact() {
    this._isSubmit = true;
    this._subUser = this._apiUser.requestForgetPassword(this.formForgetPassword.value.email)
    .subscribe((data:any) => {
      this.responseRequest = 'an email is going to be sent to your email, it may arrive in your spam mailbox. Make sure you check it !'
      this.classResponseRequest = 'success-request'
    }, (err:any) => {
      this.responseRequest = err
      this.classResponseRequest = 'error-request'
    })
  }

  public errorFormControlByName(controlName:string, errorName:string):boolean {
    return this._isSubmit
    ? this.formForgetPassword.get(controlName).hasError(errorName)
    : this.formForgetPassword.get(controlName).hasError(errorName) && this.formForgetPassword.get(controlName).dirty
  }
}
