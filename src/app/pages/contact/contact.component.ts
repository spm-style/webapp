import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiContactService } from '../../service/api-contact.service';
import { NgRedux, FETCH_SEO_DATA, RDXRootState } from '../../store'

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public formContact:FormGroup;
  public responseRequest:string;
  public classResponseRequest:any;

  constructor(
    private _formBuilder:FormBuilder,
    private _apiContact:ApiContactService,
    private _redux:NgRedux<RDXRootState>
  ){}

  ngOnInit() {
    this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'contact' })
    this.formContact = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      question: ['project', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }

  public onSubmitContact(){
    this._apiContact.sendContact(this.formContact.value)
    .subscribe(
      (data:any) => {
        this.showErrorRequest('success');
        this.formContact.reset();
      },
      (error:any) => {
        this.showErrorRequest('error')
      }
    )
  }

  private showErrorRequest(status:string):void {
    if(status == 'success'){
      this.classResponseRequest = 'success-request';
      this.responseRequest = 'email has been sent successfully';
    }else if(status == 'error'){
      this.classResponseRequest = 'error-request';
      this.responseRequest = 'error while sending email';
    }else{
      this.classResponseRequest = 'error-request';
      this.responseRequest = 'error while sending email';
    }
    setTimeout(() => {
      this.responseRequest = '';
    }, 3000)
  }

}
