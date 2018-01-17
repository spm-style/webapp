import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiUserService } from '../../../../service/api-user.service';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { RelativeDatePipe } from '../../../../pipes/relative-date.pipe'
import 'rxjs/add/operator/debounceTime';
import { NgRedux, RDXRootState, RDXUser, select, IUser, Observable, dispatch, CHANGE_CURRENT_PACKAGE, CHANGE_TAB_TITLE } from '../../../../store'

interface ICLassUserPackage {
	name:string,
	downloadTotal:number,
	stars:number,
	numContributors:number,
	updatedAt:string,
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

	private _subPackageSearch:Subscription

  constructor(
  	private _router:Router,
  	private _formBuilder:FormBuilder,
  	private _activatedRoute:ActivatedRoute,
    private _redux:NgRedux<RDXRootState>
  ) { }

  @select(['user']) public user: Observable<RDXUser>

  ngOnInit() {

    this._redux.dispatch({ type: CHANGE_TAB_TITLE, title: 'my packages' })

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
      this.searchPattern = pattern
      this._router.navigate(['user', 'packages'], { queryParams: {page: this.page, search: this.searchPattern}})
    })
  }

  ngOnDestroy(){
		if(this._subPackageSearch) this._subPackageSearch.unsubscribe()
  }

  @dispatch() public selectPackage(selectedPackage:ICLassUserPackage):any { return { type: CHANGE_CURRENT_PACKAGE, package: selectedPackage } }

}
