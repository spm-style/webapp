'use strict';
import { ElementRef, Renderer2 } from '@angular/core'

interface ISettings {
  delay: number,
  gutter: number,
  container: ElementRef,
  cards: [ElementRef],
  loaded: boolean,
  shorterFirst: boolean
}

export class PinterestGrid {

  private _delay:number
  private _gutter:number
  private _container:ElementRef
  private _cards:[any]
  private _transform:string
  private _loaded:boolean
  private _shorterFirst:boolean
  private _renderer:Renderer2

  constructor( settings:ISettings, renderer:Renderer2 ) {
    this._delay = settings.delay;
    this._gutter = settings.gutter;
    this._container = settings.container
    this._cards = settings.cards
    this._loaded = settings.loaded
    this._shorterFirst = settings.shorterFirst
    this._renderer = renderer
    this._transform = this._getTransformProperty()
  }

  private _getTransformProperty():string {
    let style = this._renderer.createElement('div').style
    let transform, vendorProp
    if(style[vendorProp = 'webkitTransform'] !== undefined){ transform = vendorProp }
    if(style[vendorProp = 'msTransform'] !== undefined){ transform = vendorProp }
    if(style[vendorProp = 'transform'] !== undefined){ transform = vendorProp }
    return transform
  }

  public init():void {
    this._loaded = true
    this._renderer.setStyle(this._container.nativeElement, 'width', '')
    let containerWidth = this._container.nativeElement.getBoundingClientRect().width;
    let itemsWidth = this._cards[0].getBoundingClientRect().width + this._gutter;
    let cols = Math.max(Math.floor((containerWidth - this._gutter) / itemsWidth), 1);
    this._renderer.setStyle(this._container.nativeElement, 'width', `${itemsWidth * cols + this._gutter}px`)
    this._renderer.setStyle(this._container.nativeElement, 'position', 'relative')

    let itemsPosY = [];
    let itemsPosX = [];

    for (let i = 0; i < cols; i++) {
      itemsPosX.push(i * itemsWidth + this._gutter);
      itemsPosY.push(this._gutter);
    }

    for (var i = 0; i < this._cards.length; i++) {
      let firstItem, itemIndex, posX, posY;
      if(this._shorterFirst){
        firstItem = itemsPosY.slice(0).sort((a, b) => { return a - b }).shift();
        itemIndex = itemsPosY.indexOf(firstItem);
      }else{
        itemIndex = i % cols;
      }

      posX = itemsPosX[itemIndex];
      posY = itemsPosY[itemIndex];
      this._renderer.setStyle(this._cards[i], 'position', 'absolute')
      this._renderer.setStyle(this._cards[i], this._transform, `translate3d(${posX}px, ${posY}px, 0)`)
      itemsPosY[itemIndex] += this._cards[i].getBoundingClientRect().height + this._gutter
      this._renderer.setStyle(this._container.nativeElement, 'height', `${itemsPosY.slice(0).sort(function(a, b) { return a - b }).pop() + this._gutter}px`)
      let isLoaded = this._cards[i].classList.contains('loaded')
      if(!isLoaded){ setTimeout(this._displayCard(i) , this._delay * i ) }
    }
  }

  private _displayCard(index:number):void {
    this._renderer.addClass(this._cards[index], 'loaded')
  }
}
