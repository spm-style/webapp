import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux, RDXRootState, CHANGE_TAB_TITLE } from '../../../../store'

@Component({
  selector: 'spm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	public formSettings:FormGroup;

  constructor(
    private _formBuilder:FormBuilder,
    private _redux:NgRedux<RDXRootState>
  ) { }

  ngOnInit() {
    this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'settings' })

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
