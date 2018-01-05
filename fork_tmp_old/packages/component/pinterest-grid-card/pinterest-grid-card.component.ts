import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, HostListener }    from '@angular/core';
import { PinterestGridService, ICardInfo }                                      from '../../service/pinterest-grid.service';
import { Subject }                                                              from 'rxjs/Subject';
import { Router } from '@angular/router';
import { IPackageOrigin } from '../../../../store'

@Component({
  selector: 'pinterest-grid-card',
  templateUrl: './pinterest-grid-card.component.html',
  styleUrls: ['./pinterest-grid-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinterestGridCardComponent implements OnInit {

  // @ViewChild('card') private _card:ElementRef;

  private data$:Subject<IPackageOrigin>;

  constructor(
    private _pinterestService:PinterestGridService,
    private _elem:ElementRef,
    private _router:Router
  ){}

  @HostListener('click') navigateDetail():void {
    console.log('click', this)
    this.data$.subscribe((packageOrigin:IPackageOrigin) => {
      console.log('merde')
      this._router.navigate(['packages', packageOrigin.name])
    })
  }

  ngOnInit() {
    console.log('merde')
    this.data$ = this._pinterestService.initCard({card:this._elem, func:this._prepareCard})
  }

  private _prepareCard(card:ICardInfo, data:any){
    return new Promise((resolve, reject) => {
      card.elem.nativeElement.style.display = `inline-block`
      let scale = card.elem.nativeElement.children[0].children[0].getBoundingClientRect().width / data.distTags.latest.responsiveness[0].w
      card.elem.nativeElement.children[0].children[0].style.height = `${data.distTags.latest.responsiveness[0].h * scale}px`
      card.elem.nativeElement.children[0].children[0].style.width = `${(data.distTags.latest.responsiveness[0].w * scale) - 2}px`
      card.elem.nativeElement.children[0].children[0].children[0].style.height = `${data.distTags.latest.responsiveness[0].h}px`
      card.elem.nativeElement.children[0].children[0].children[0].style.width = `${data.distTags.latest.responsiveness[0].w}px`
      card.elem.nativeElement.children[0].children[0].children[0].style.transform = `scale(${scale})`
      card.elem.nativeElement.children[0].children[0].children[0].src = `http://cdn.spm-style.com/overview/${data.distTags.latest.cdn}`
      setTimeout(() => { resolve() }, 1000)
    })
  }

}
