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
	
	public title:string
	public message:string
	public type:string
	public name:string
	private _subPopupService:Subscription
	public formRemove:FormGroup

  constructor(
  	private _router:Router,
  	private _popupService:PopupService,
  	private _formBuilder:FormBuilder
  ) { }

  ngOnInit() {
  	this.title = this._popupService.confirmationTitle
  	this.message = this._popupService.confirmationMessage
  	this.type = this._popupService.confirmationType
  	this.name = this._popupService.confirmationName
  	this.formRemove = this._formBuilder.group({
      name: ['', [Validators.pattern(this.name)]],
    })
  }

  public submitRemove(){
  	console.log(this.formRemove)
  	// this._popupService.confirmationResponse(response)
  }

  public isValid(value:string):boolean {
  	console.log(value, this.message)
  	return value === this.message
  }

  public closePopup():void {
  	this._router.navigate([{outlets: {popup: null}}])
  }
}
