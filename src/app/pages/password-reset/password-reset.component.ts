import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'spm-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

	public passwordResetToken:String

  constructor(private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  	this._activatedRoute.queryParams.subscribe((data:any) => {
  		this.passwordResetToken = data.reset
  		console.log(this.passwordResetToken)
    })
  }

}
