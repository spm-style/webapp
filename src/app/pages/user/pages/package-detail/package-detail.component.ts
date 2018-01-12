import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiPackageOriginService } from '../../../../service/api-package-origin.service';
// import { NgRedux, RDXRootState, IUser, select, Observable, FETCH_CURRENT_USER_PACKAGE } from '../../../../store';

interface IVersion {
	name:string,
	createdAt:Date,
	latest:boolean
}

interface IUserPackage {
	name:string,
	createdAt:Date,
	lastUpdateAt:Date,
	lastDownloadAt:Date,
	owners: string[],
	versions: IVersion[],
	stars:number,
	downloads:number
}

interface IUser {
	currentPackage: IUserPackage
}

@Component({
  selector: 'spm-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {

	public formOwner:FormGroup;
	public responseRequest:string = '';
  public classResponseRequest:any = {'pending': true};
	// @select(['user', 'currentPackage']) readonly current:Observable<IUser>

	public user:IUser = {
		currentPackage: {
			name: 'herve_apollo',
			createdAt: new Date('2017-12-15T22:35:10.099Z'),
			lastUpdateAt: new Date('2018-01-09T12:35:10.099Z'),
			lastDownloadAt: new Date('2018-01-10T07:12:10.099Z'),
			owners: ['herve', 'adrien'],
			versions: [
				{ name: '1.0.1', createdAt: new Date('2017-12-15T22:35:10.099Z'), latest: false },
				{ name: '1.1.2', createdAt: new Date('2018-01-4T18:57:10.099Z'), latest: false },
				{ name: '2.0.0', createdAt: new Date('2018-01-9T12:35:10.099Z'), latest: true }
			],
			stars: 22,
			downloads: 109
		}
	}

	public current:IUserPackage =  this.user.currentPackage;

  constructor(private _formBuilder:FormBuilder,
  	private _apiPackageOrigin:ApiPackageOriginService) { }

  ngOnInit() {
  	this.formOwner = this._formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  public onSubmitOwner(){
  	this._apiPackageOrigin.updateContributors('add', this.current.name, this.formOwner.value.name)
  	.subscribe(
      (data:any) => {
        this.classResponseRequest = {'success': true}
        this.responseRequest = `contributor ${this.formOwner.value.name} successfully added`
        this.formOwner.reset();
      },
      (error:any) => {
      	this.classResponseRequest = {'error': true}
      	this.responseRequest = error === 'missing token' ? 'please login again' : error
      }
    )
  }
}
