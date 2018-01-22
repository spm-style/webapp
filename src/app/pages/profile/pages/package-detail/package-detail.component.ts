import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiPackageOriginService } from '../../../../service/api-package-origin.service'
import { PopupService } from '../../../../modules/popup/popup.service'
import { Subscription } from 'rxjs/Subscription'
import { NgRedux, RDXRootState, select, Observable, dispatch, CHANGE_CURRENT_PACKAGE, CHANGE_TAB_TITLE, ADD_CURRENT_PACKAGE_CONTRIBUTOR, REMOVE_CURRENT_PACKAGE_CONTRIBUTOR, REMOVE_CURRENT_PACKAGE_VERSION } from '../../../../store'
import { ActivatedRoute } from '@angular/router'

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

	public formOwner:FormGroup
	public responseRequest:string = ''
  public classResponseRequest:any = {'pending': true}
  private _subPopup:Subscription
  private _subActivatedRoute:Subscription
  private _subUser:Subscription
  private _subPackage:Subscription
  public name:string

	@select(['admin', 'currentPackage']) current:IUserPackage
  @select(['user']) readonly user:IUser

  constructor(private _formBuilder:FormBuilder,
  	private _apiPackageOrigin:ApiPackageOriginService,
    private _popupService:PopupService,
    private _redux:NgRedux<RDXRootState>,
    private _activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {


    this.formOwner = this._formBuilder.group({
      name: ['', [Validators.required]]
    })

    this._subActivatedRoute = this._activatedRoute.params.subscribe((data:any) => {
      console.log()
      this.name = data.name
      if (!this._redux.getState().admin.currentPackage) {
        this._subUser = this._redux.select('user').subscribe((user:any) => {
          for(let item of user.packages) {
            if (item.name === data.name) {
              this._redux.dispatch({ type: CHANGE_CURRENT_PACKAGE, package: item })
            }
          }
        })
      }
    })
    this._redux.dispatch({type: CHANGE_TAB_TITLE, title: this.name + ' - admin' })
  }

  ngOnDestroy() {
    if (this._subPopup) {
  	  this._subPopup.unsubscribe()
    }
    if (this._subActivatedRoute) {
      this._subActivatedRoute.unsubscribe()
    }
    if (this._subUser) {
      this._subUser.unsubscribe()
    }
    if (this._subPackage) {
      this._subPackage.unsubscribe()
    }
  }

  public onSubmitOwner(){
  	this._apiPackageOrigin.updateContributors('add', this.name, this.formOwner.value.name)
  	.subscribe(
      (data:any) => {
        this.classResponseRequest = {'success': true}
        this.responseRequest = `contributor ${this.formOwner.value.name} successfully added`
        this.formOwner.reset();
        this._redux.dispatch({ type: ADD_CURRENT_PACKAGE_CONTRIBUTOR, user: data })
      },
      (error:any) => {
      	this.classResponseRequest = {'error': true}
      	this.responseRequest = error === 'missing token' ? 'please login again' : error
      }
    )
  }

  public removeFromPackage(type:string, value:string, safety:boolean){
    this._subPopup = this._popupService.confirmation(
      'remove',
      'Removing from package herve_apollo',
      'Be careful ! You are about to remove',
      type,
      value,
      safety).subscribe((data) => {
      if (data) {
      	this._subPopup.unsubscribe()
        if (type === 'contributor') {
          this._subPackage = this._apiPackageOrigin.updateContributors('remove', this.name, value)
          .subscribe(
            (data:any) => {
              this._subPackage.unsubscribe()
              this.classResponseRequest = {'success': true}
              this.responseRequest = `contributor ${this.formOwner.value.name} successfully removed`
              this.formOwner.reset();
              this._redux.dispatch({ type: REMOVE_CURRENT_PACKAGE_CONTRIBUTOR, login: value })
            },
            (error:any) => {
              this._subPackage.unsubscribe()
              this.classResponseRequest = {'error': true}
              this.responseRequest = error === 'missing token' ? 'please login again' : error
            }
          )
        }
        if (type === 'version') {
          this._subPackage = this._apiPackageOrigin.removeVersion(this.name, value)
          .subscribe(
            (data:any) => {
              this._subPackage.unsubscribe()
              this._redux.dispatch({ type: REMOVE_CURRENT_PACKAGE_VERSION, version: value })
            },
            (error:any) => {
              console.log(error)
              this._subPackage.unsubscribe()
            }
          )
        }
      }
    })
  }
}
