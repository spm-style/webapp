import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../../../service/api-user.service';

interface ICLassUserPackages {
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

	public userPackages:ICLassUserPackages[] = [
		{
			name: 'hervé_apollo',
			downloads: 670,
			stars: 102,
			numContributors: 9,
			lastUpdate: 'hier',
			latestVersion: '3.0.2',
			cdn: 'test'
		},
		{
			name: 'hervé_apollo',
			downloads: 670,
			stars: 102,
			numContributors: 9,
			lastUpdate: 'hier',
			latestVersion: '3.0.2',
			cdn: 'test'
		},
		{
			name: 'hervé_apollo',
			downloads: 670,
			stars: 102,
			numContributors: 9,
			lastUpdate: 'hier',
			latestVersion: '3.0.2',
			cdn: 'test'
		}
	]

  constructor(private _apiUser:ApiUserService) { }

  ngOnInit() {
  	// this._apiUser.getPackages()
  	// .subscribe(
   //    (data:any) => {
   //      console.log('getPackages API', data)
   //    },
   //    (error:any) => {
   //      // this.showErrorRequest('error')
   //    }
   //  )
  }

}
