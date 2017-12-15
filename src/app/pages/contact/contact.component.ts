import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiContactService } from '../../service/api-contact.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public formContact:FormGroup;
  public responseRequest:string;
  public classResponseRequest:string;

  constructor(
    private _formBuilder:FormBuilder,
    private _apiContact:ApiContactService
  ){}

  ngOnInit() {
    this.formContact = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      question: ['project', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }

  public onSubmitContact(){
    // console.log(this.formContact)
    console.log(this._apiContact)
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
