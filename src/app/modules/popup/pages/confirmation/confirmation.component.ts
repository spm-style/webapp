import { Component, OnInit } from '@angular/core'
import { PopupService } from '../../popup.service'
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'spm-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
	
  public action:string
	public title:string
	public message:string
	public type:string
	public name:string
  public safety:boolean
  public errorMessage:string
	private _subPopupService:Subscription
	public formConfirmation:FormGroup

  constructor(
  	private _router:Router,
  	private _popupService:PopupService,
  	private _formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.action = this._popupService.confirmationAction
  	this.title = this._popupService.confirmationTitle
  	this.message = this._popupService.confirmationMessage
  	this.type = this._popupService.confirmationType
  	this.name = this._popupService.confirmationName
    this.safety = this._popupService.confirmationSafety
  	this.formConfirmation = this._formBuilder.group({
      name: ['', [Validators.pattern(this.name)]],
    })
  }

  public submitConfirmation(){
    if (!this.safety || this.formConfirmation.value.name === this.name) {
  	  this._popupService.confirmationResponse(true)
    }
  }

  public isValid(value:string):boolean {
  	return value === this.message
  }

  public closePopup():void {
  	this._popupService.confirmationResponse(false)
  }
}
