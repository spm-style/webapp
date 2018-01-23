import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiContactService } from '../../service/api-contact.service';
import { NgRedux, CHANGE_TAB_TITLE, RDXRootState } from '../../store'

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
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: 'contact' })
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
      this.responseRequest = 'success to send email';
    }else if(status == 'error'){
      this.classResponseRequest = 'error-request';
      this.responseRequest = 'error to send email';
    }else{
      this.classResponseRequest = 'error-request';
      this.responseRequest = 'error to send email';
    }
    setTimeout(() => {
      this.responseRequest = '';
    }, 3000)
  }

}
