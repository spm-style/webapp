import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

interface IBackToPath {
  url:string,
  dist:string
}

@Component({
  selector: 'spm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('buttonBackTo') private _backto:ElementRef

  public classNav:string = '';


  public backToCurrent:string
  private _backToPath:IBackToPath[] = [
    { url: '/packages/', dist: '/packages' },
    { url: '/documentation/', dist: '/documentation' }
  ]

  constructor(
    private _router: Router,
    private _location: Location,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {

    this._router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        console.log(event.url)
        this._renderer.removeClass(this._backto.nativeElement, 'back-to-active')
        for(let path of this._backToPath){
          if(event.url.indexOf(path.url) != -1){
            this.backToCurrent = path.dist
            this._renderer.addClass(this._backto.nativeElement, 'back-to-active')
          }
        }
      }
      if(event instanceof NavigationEnd){
        this.classNav = '';
      }
    });

    // document.addEventListener('click', (event:any) => {
    //   console.log(event.path)
    //   let find:boolean = false;
    //   for(let path of event.path){
    //     if(path.className == 'header-navigation'){
    //       console.log('merde')
    //       find = true;
    //     }
    //   }
    //   if(!find) { this.classNav = '' }
    // })
  }

  public toggleMenu():void{
    this.classNav = this.classNav != '' ? '' : 'open-nav';
  }
}
