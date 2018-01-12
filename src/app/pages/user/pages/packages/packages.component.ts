import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiUserService } from '../../../../service/api-user.service';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import { PopupService } from '../../../../modules/popup/popup.service'

// import { NgRedux, RDXRootState, dispatch, SELECT_USER_PACKAGE } from '../../../../store';
// import { NgRedux, RDXAppState, dispatch, STOP_MAIN_CONTAINER_SCROLL, START_MAIN_CONTAINER_SCROLL } from '../../../../store';


interface ICLassUserPackage {
	name:string,
	downloads:number,
	stars:number,
	numContributors:number,
	lastUpdate:string,
	latestVersion:string,
	cdn:string
}

@Component({
  selector: 'spm-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

	public formUserPackages:FormGroup
	public searchPattern:string
	public page:number

	public userPackages:ICLassUserPackage[] = []

	private _subPackageSearch:Subscription
  private _subPopup:Subscription

  constructor(private _apiUser:ApiUserService,
  	private _router:Router,
  	private _formBuilder:FormBuilder,
  	private _activatedRoute:ActivatedRoute,
    private _popupService:PopupService
  ) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((data:any) => {
    	this.page = data.page || 1
    	this.searchPattern = data.search || ''
    })

  	this.formUserPackages = this._formBuilder.group({
      name: [this.searchPattern, []]
    })

    this._subPackageSearch = this.formUserPackages.get('name').valueChanges
    .debounceTime(300)
    .subscribe((pattern:string) => {
    	//REDUX FILTER
    	// this._filterPackages(pattern)
    })

    this._filterPackages(this.formUserPackages.value.name)
  }

  ngOnDestroy(){
  	this._subPackageSearch.unsubscribe()
  }

  private _filterPackages(pattern:string):void{
  	//REDUX FILTER
  	// this._apiUser.getPackages(pattern)
  	// .subscribe(
   //    (data:any) => {
   //      console.log('getPackages API', data)
   //      this.userPackages = data.packages
   //    },
   //    (error:any) => {
   //      this.userPackages = []
   //    }
   //  )
  }

  public test(){
    this._subPopup = this._popupService.confirmation(
      'Removing from package herve_apollo',
      'Be careful ! You are about to remove',
      'user',
      'herve').subscribe((data) => {
      console.log(data)
      this._subPopup.unsubscribe()
    })
  }

  // @dispatch() public selectPackage(data:ICLassUserPackage):any { return { type: SELECT_USER_PACKAGE, package: data } }

}
