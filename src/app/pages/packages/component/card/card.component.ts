import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'

import { IPackageOrigin, CURRENT_IN_LIST, NgRedux, RDXRootState, FETCH_CURRENT_PACKAGE_ORIGIN } from '../../../../store';

@Component({
  selector: 'spm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  @Input('data') readonly data:IPackageOrigin
  // @Output() setPositionCard = new EventEmitter();

  @ViewChild('iframe') private _iframe:ElementRef
  @ViewChild('containerIframe') private _containerIframe:ElementRef
  @HostListener('click', ['$event']) onResize(event) { this._router.navigate(['packages', this.data.name]) }


  constructor(
    private _sanitizer: DomSanitizer,
    private _elem:ElementRef,
    private _renderer:Renderer2,
    private _router:Router,
    private _redux:NgRedux<RDXRootState>
  ){}

  ngOnInit() {
    let overviewWidth = this._elem.nativeElement.clientWidth - 20
    let scale = overviewWidth / this.data.distTags.latest.responsiveness[0].w
    this._renderer.setStyle(this._containerIframe.nativeElement, 'width', `${this.data.distTags.latest.responsiveness[0].w * scale}px`)
    this._renderer.setStyle(this._containerIframe.nativeElement, 'height', `${this.data.distTags.latest.responsiveness[0].h * scale}px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'transform', `scale(${scale})`)
    this._renderer.setStyle(this._iframe.nativeElement, 'width', `${this.data.distTags.latest.responsiveness[0].w}px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'height', `${this.data.distTags.latest.responsiveness[0].h}px`)
  }

  public urlIframe(uuid: string){
    return this._sanitizer.bypassSecurityTrustResourceUrl(`http://cdn.spm-style.com/overview/${uuid}`);
  }
}
