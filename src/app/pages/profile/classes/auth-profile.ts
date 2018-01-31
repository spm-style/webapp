import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { LocalstorageService } from '../../../service/localstorage.service'

@Injectable()
export class AuthProfile implements CanActivate {
	constructor(
		private _router:Router,
		private _localStorage:LocalstorageService
	){}

	canActivate():boolean {
		if (!this._localStorage.getLoginInfos().token) {
			this._router.navigate(['connection', 'sign-in'])
			return false
		}
		return true
	}
}
