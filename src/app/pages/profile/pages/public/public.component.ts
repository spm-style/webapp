import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux, RDXRootState, IUser, CHANGE_TAB_TITLE, select } from '../../../../store'

@Component({
  selector: 'spm-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit, OnDestroy {
	  
	public formPublicProfile:FormGroup
  public username:string

  @select(['user']) readonly user:IUser

  constructor(
    private _formBuilder:FormBuilder,
    private _redux:NgRedux<RDXRootState>,
  ) { }

  ngOnInit() {

    this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'public profile' })
  	//faire la requête API avec les valeurs déjà enregistrées
  	this.formPublicProfile = this._formBuilder.group({
      name: ['', []],
      publicEmail: ['', [Validators.email]],
      description: ['', []],
      url: ['', []],
      company: ['', []],
      location: ['', []]
    })
  }

  ngOnDestroy() {

  }

  public onSubmitContact() {
  	console.log('coucou', this.formPublicProfile.value)
  }

}
