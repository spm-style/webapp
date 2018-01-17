import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Router } from '@angular/router'



@Injectable()
export class PopupService {

  public confirmationAction:string
  public confirmationTitle:string
	public confirmationMessage:string
  public confirmationType:string
  public confirmationName:string
  public confirmationSafety:boolean
	private _confirmationResponse:Subject<boolean> = new Subject()

  constructor(
  	private _router:Router
  ){}

  public confirmation(action:string, title:string, message:string, type:string, name:string, safety:boolean):Subject<boolean> {
  	this._router.navigate([{outlets: {'popup': ['full', 'userRemove']}}])
    this.confirmationAction = action
    this.confirmationTitle = title
    this.confirmationMessage = message
    this.confirmationType = type
    this.confirmationName = name
    this.confirmationSafety = safety
  	return this._confirmationResponse
  }

  public confirmationResponse(response:boolean){
  	this._router.navigate([{outlets: {'popup': null}}])
  	this._confirmationResponse.next(response)
  }
}
