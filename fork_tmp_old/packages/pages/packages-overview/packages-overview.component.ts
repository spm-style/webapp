import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';


import { PinterestGridService, INIT_DATA, MORE_DATA, SUCCESS_DATA, EMPTY_DATA, LOADER_DATA, STOP_LOADER_DATA } from '../../service/pinterest-grid.service';

import { ApiPackageOriginService } from '../../../../service/api-package-origin.service';
                                                                                // Redux
import { NgRedux, RDXRootState, FETCH_PACKAGE_ORIGIN }                 from '../../../../store';

@Component({
  templateUrl: './packages-overview.component.html',
  styleUrls: ['./packages-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesOverviewComponent implements OnInit {

  @ViewChild('grid') private _grid;

  private _subscriptionPinterestEvent:Subscription;
  private _pinterestEvent:Subject<string>;
  private _loader:any;

  constructor(
    private _pinterestService:PinterestGridService,
    private _apiPackageOrigin:ApiPackageOriginService,
    private _redux:NgRedux<RDXRootState>
  ) { }

  ngOnInit(){
    // this._loader = document.querySelector('.loader');
    this._pinterestEvent = this._pinterestService.init(this._grid, {widthCard: 320, amountCard: 30, data: this._redux.select(['packageOrigin', 'list'])})

    if(this._redux.getState().packageOrigin.list.length == 0){
      console.log('first')

      this._apiPackageOrigin.listPackageOrigin()
      .subscribe(
        (data:any) => {
          this._redux.dispatch({type: FETCH_PACKAGE_ORIGIN, list:data})
          this._pinterestEvent.next(INIT_DATA)
        },
        (error:any) => { console.log(error) }
      )
    }else{
      setTimeout(() => {
        this._pinterestEvent.next(INIT_DATA)
      },1000)
    }



    this._subscriptionPinterestEvent = this._pinterestEvent.subscribe((event:string) => {
      switch(event){
        case MORE_DATA:
        this._loader.style.opacity = 1;
          // this._apiPackages.getList()
          // .subscribe(
          //   (data:any[]) => {
          //     if(data.length == 0){
          //       this._pinterestEvent.next(EMPTY_DATA)
          //     }else if(data.length < 30){
          //       this._redux.dispatch({type: FETCH_PACKAGES_LIST, list:data});
          //       this._pinterestEvent.next(EMPTY_DATA)
          //       setTimeout(() => { this._loader.style.opacity = 0 }, 600)
          //     }else{
          //       this._redux.dispatch({type: FETCH_PACKAGES_LIST, list:data});
          //       this._pinterestEvent.next(SUCCESS_DATA)
          //       setTimeout(() => { this._loader.style.opacity = 0 }, 300)
          //     }
          //   },
          //   error => { console.log(error) }
          // );
          // break;
        }
    })
  }

}
