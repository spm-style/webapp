import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'spm-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public formSignIn:FormGroup;

  constructor(
    private _formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.formSignIn = this._formBuilder.group({
      // username: ['', [Validators.required, Validators.maxLength(31), , Validators.minLength(4)], this._asyncUserNameAlreadyExist ],
      // email: ['', [Validators.required, Validators.email], this._asyncEmailAlreadyExist ],
      // password: ['', [Validators.required, Validators.pattern(`(?=.*[A-Za-z])(?=.*\\d).{8,}`), Validators.maxLength(31)]],
      login: ['',[Validators.required, Validators.maxLength(31), Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.pattern(`(?=.*[A-Za-z])(?=.*\\d).{8,}`), Validators.maxLength(31)]]
    })
  }

  public onSubmitSignIn(){
    console.log(this.formSignIn)
  }

}


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
// import { Observable } from 'rxjs/Observable'
// import { Subscription } from 'rxjs/Subscription'
//
// interface IErrorOnSubmit {
//   name:string,
//   errors: [{
//     name:string,
//     status:boolean
//   }]
// }
//
// @Component({
//   selector: 'spm-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.scss']
// })
// export class SignUpComponent implements OnInit, OnDestroy {
//
//   private _subValueChangePassword:Subscription
//
//   private _isSubmit:boolean = false
//
//   public formSignUp:FormGroup;
//
//   constructor(
//     private _formBuilder:FormBuilder
//   ){}
//

//
//     this.formSignUp.get('passwordRepeat').setValidators(this._isPasswordMatch(<FormControl>this.formSignUp.get('password'), <FormControl>this.formSignUp.get('passwordRepeat')))
//     this._subValueChangePassword = this.formSignUp.get('password').valueChanges.subscribe((value:any) => {
//       this.formSignUp.get('passwordRepeat').setValue('')
//       this.formSignUp.get('passwordRepeat').markAsPristine()
//     })
//   }
//
//   ngOnDestroy(){
//     this._subValueChangePassword.unsubscribe()
//   }
//
//   // private _passwordMatch(PasswordName: string, passwordRepeatName: string): ValidatorFn {
//   //   return (group: FormGroup): {[key: string]: any} => {
//   //     let target = group.get(PasswordName)
//   //     let toMatch = group.get(passwordRepeatName)
//   //     let testMatch = target.valid && toMatch.value.length > 0 && target.value !== toMatch.value ? { passwordMatch: true } : null
//   //     // !testMatch ? this._passwordMatchState
//   //     this._passwordMatchState.state = !testMatch ? true : false
//   //     // console.log(this._passwordMatchState, testMatch)
//   //     return testMatch
//   //   }
//   // }
//
//   private _isPasswordMatch(password:FormControl, match:FormControl):ValidatorFn {
//     return (control: FormControl): { [key: string]: boolean } => {
//       return match.value.length > 0 && password.value !== match.value ? { passwordMatch: true } : null
//     }
//   }
//
//   private _asyncUserNameAlreadyExist(control: FormControl): Promise<any> | Observable<any> {
//     const promise = new Promise<any>((resolve, reject) => {
//       setTimeout( () => { control.value === 'herve' ? resolve({ 'alreadyExist': true}) : resolve(null) } ,1500)
//     });
//     return promise;
//   }
//
//   private _asyncEmailAlreadyExist(control: FormControl): Promise<any> | Observable<any> {
//     const promise = new Promise<any>((resolve, reject) => {
//       setTimeout( () => { control.value === 'boblee21@live.fr' ? resolve({ 'alreadyExist': true}) : resolve(null) } ,1500)
//     });
//     return promise;
//   }
//
//   public errorFormControlByName(controlName:string, errorName:string):boolean {
//     return this._isSubmit
//     ? this.formSignUp.get(controlName).hasError(errorName)
//     : this.formSignUp.get(controlName).hasError(errorName) && this.formSignUp.get(controlName).dirty
//   }
//
//   public errorFormByName(errorName:string):boolean {
//     return this._isSubmit
//     ? this.formSignUp.hasError(errorName)
//     : this.formSignUp.hasError(errorName) && this.formSignUp.dirty
//   }
//

// }
