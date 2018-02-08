import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'
import { environment } from '../../../../../environments/environment'

import { dispatch, IPackageOrigin, FETCH_CURRENT_PACKAGE_ORIGIN } from '../../../../store';

@Component({
  selector: 'spm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  public CDN_URL:string = environment.cdnUrl

  @Input('data') readonly data:IPackageOrigin

  @ViewChild('iframe') private _iframe:ElementRef
  @ViewChild('containerIframe') private _containerIframe:ElementRef

  @HostListener('click', ['$event']) onResize(event) { this._router.navigate(['packages', this.data.name]) }

  @dispatch() public setCurrentPackage():any { return { type: FETCH_CURRENT_PACKAGE_ORIGIN, packageOrigin: this.data } }

  constructor(
    private _sanitizer: DomSanitizer,
    private _elem:ElementRef,
    private _renderer:Renderer2,
    private _router:Router
  ){}

  ngOnInit() {
    let overviewWidth = this._elem.nativeElement.clientWidth - 20
    let scale = overviewWidth / this.data.distTags.latest.responsiveness[0].w
    this._renderer.setStyle(this._containerIframe.nativeElement, 'width', `${this.data.distTags.latest.responsiveness[0].w * scale}px`)
    this._renderer.setStyle(this._containerIframe.nativeElement, 'height', `${this.data.distTags.latest.responsiveness[0].h * scale}px`)
  }
}
