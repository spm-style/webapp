import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy }    from '@angular/core';
import { PinterestGridService, ICardInfo }                                      from '../../service/pinterest-grid.service';
import { Subject }                                                              from 'rxjs/Subject';

@Component({
  selector: 'pinterest-grid-card',
  templateUrl: './pinterest-grid-card.component.html',
  styleUrls: ['./pinterest-grid-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinterestGridCardComponent implements OnInit {

  @ViewChild('card') private _card:ElementRef;

  public data$:Subject<any>;

  constructor(
    private _pinterestService:PinterestGridService,
    private _elem:ElementRef
  ){}

  ngOnInit() {
    this.data$ = this._pinterestService.initCard({card:this._card, func:this._prepareCard})
  }

  private _prepareCard(card:ICardInfo, data:any){
    return new Promise((resolve:any, reject:any) => {
      // console.log(card.elem)
      let scale = card.elem.nativeElement.children[0].getBoundingClientRect().width / data.responsiveness[0].size.w;
      // console.log('width', card.elem.nativeElement.children[0].getBoundingClientRect().width)
      // console.log('scale', scale)
      card.elem.nativeElement.children[0].style.height = `${data.responsiveness[0].size.h * scale}px`;
      card.elem.nativeElement.children[0].style.width = `${(data.responsiveness[0].size.w * scale) - 2}px`;

      // console.log('responsiveness w', data.responsiveness[0].size.w)
      // console.log('responsiveness w * scale', data.responsiveness[0].size.w * scale)
      card.elem.nativeElement.children[0].children[0].style.height = `${data.responsiveness[0].size.h}px`;
      card.elem.nativeElement.children[0].children[0].style.width = `${data.responsiveness[0].size.w}px`;
      card.elem.nativeElement.children[0].children[0].style.transform = `scale(${scale})`;
      card.elem.nativeElement.children[0].children[0].src = data.iframe;
      // console.log('test2')
      setTimeout(() => { resolve() }, 1);
    })
  }

}
