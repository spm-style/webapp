import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'spm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public classNav:string = '';

  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events.subscribe((event) => {
        if(event instanceof NavigationEnd){
          this.classNav = '';
        }
    });

    document.addEventListener('click', (event:any) => {
      let find:boolean = false;
      for(let path of event.path){
        if(path.className == 'header-navigation'){
          console.log('merde')
          find = true;
        }
      }
      if(!find) { this.classNav = '' }
    })
  }

  public toggleMenu():void{
    this.classNav = this.classNav != '' ? '' : 'open-nav';
  }
}
