import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'spm-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
	  
	public formPublicProfile:FormGroup;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit() {
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

  public onSubmitContact() {
  	console.log('coucou', this.formPublicProfile.value)
  }

}
