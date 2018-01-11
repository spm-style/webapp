import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'spm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	public formSettings:FormGroup;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit() {
  	this.formSettings = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordRepeat: ['', [Validators.required]]
    })
  }

  public onSubmitContact() {
  	console.log('coucou', this.formSettings.value)
  }

}
