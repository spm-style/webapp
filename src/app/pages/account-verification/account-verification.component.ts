import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'spm-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {

	public accountVerificationToken:String

  constructor(private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  	this._activatedRoute.queryParams.subscribe((data:any) => {
  		this.accountVerificationToken = data.verification
  		console.log(this.accountVerificationToken)
    })
  }

}
