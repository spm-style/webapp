import { Injectable, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';

interface ISetting {
  gutter?:number,
  shorterFirst?:boolean,
  _delayInit?:number,
  _delayPosition?:number,
  widthCard:number,
  amountCard:number,
  data:Observable<[any]>,
}

interface ISettingCard {
  card:ElementRef,
  func(card:ICardInfo, data:any[]):Promise<any>
}

interface IBody {
  elem: ElementRef,
  height: number,
  width:number
}

interface ICombineCardData {
  data:any,
  card:ICardInfo
}

export interface ICardInfo {
  elem:ElementRef,
  number:number,
  index:number,
  height:number,
  top:number,
  bottom:number,
  left:number,
  show:boolean,
  func(card:ICardInfo, data:any[]):Promise<any>,
  emit:Subject<any>
}

export const INIT_DATA = 'initData';
export const MORE_DATA = 'moreData';
export const SUCCESS_DATA = 'successData';
export const ERROR_DATA = 'errorData';
export const EMPTY_DATA = 'emptyData';
export const LOADER_DATA = 'loader';
export const STOP_LOADER_DATA = 'stopLoader';

const VALID_DATA = 'valid';
const WAITING_DATA = 'waiting';
const FINISH_DATA = 'finish';
const INIT_GRID_DATA = 'initGridData'
const NO_MORE_DATA = 'noMoreData'

@Injectable()
export class PinterestGridService {

  private _cardsInfo$:Observable<ICardInfo>;
  private _scroll$:Observable<any>;
  private _resize$:Observable<any>;
  private _event$: Subject<string> = new Subject();
  private _combineCardData$:Observable<ICombineCardData>;
  private _cardsInfoSubscription:Subscription;
  private _scrollSubscription:Subscription;
  private _resizeSubscription:Subscription;
  private _subscriptionEvent:Subscription;
  private _subscriptionDataRedux:Subscription;
  private _subscriptionCombineCardData:Subscription;
  private _subscriptionCombineCardDataInit:Subscription;
  private _subscriptionCombineCardDataResize:Subscription;
  private _isResizeShowTrue:boolean;
  private _isNewResize:boolean = false;
  private _isLoader:boolean = false;
  private _dataRedux:any[];
  private _statusData:string = WAITING_DATA;
  private _cardsInfo:ICardInfo[] = [];
  private _itemsPosY:any = [];
  private _itemsPosX:any = [];
  private _transform:string;
  private _posLastScroll:number = 0;
  private _containerWidth:number;
  private _cols:number;
  private _lastCardsIndex:number;
  private _amountHtmlCard:number = 0;
  private _body:IBody;
  private _container:ElementRef;
  private _gutter:number;
  private _shorterFirst:boolean;
  private _delayInit:number;
  private _delayPosition:number;
  private _widthCard:number;
  private _amountCard:number;
  private _dataRedux$:Observable<any>;

  constructor(){
    this._resize$ = Observable.fromEvent(window, 'resize').startWith(null);
    this._scroll$ = Observable.fromEvent(window, 'scroll').startWith(null);
    this._cardsInfo$ = Observable.from(this._cardsInfo);
    this._getTransformProperty();
    this._resize();
    this._eventSwitch()
    this._scrollSwitch();
  }

  ngOnDestroy(){
    // this._cardsInfoSubscription.unsubscribe();
    this._scrollSubscription.unsubscribe();
    this._resizeSubscription.unsubscribe();
    this._subscriptionEvent.unsubscribe();
    // this._subscriptionDataRedux.unsubscribe();
    // this._subscriptionCombineCardData.unsubscribe();
    // this._subscriptionCombineCardDataResize.unsubscribe();
    // this._subscriptionCombineCardDataInit.unsubscribe();
  }

  public init(container:ElementRef, setting:ISetting):Subject<string>{
    container.nativeElement.offsetParent.style.height = '100vh';
    this._body = {
      elem: container.nativeElement.offsetParent,
      height: container.nativeElement.offsetParent.clientHeight,
      width: container.nativeElement.offsetParent.clientWidth
    }
    container.nativeElement.offsetParent.style.height = '';
    // console.log('info container or grid\n', this._body)

    this._container = container;
    this._gutter = setting.gutter || 20;
    this._shorterFirst = setting.shorterFirst || true;
    this._delayInit = setting._delayInit || 100;
    this._delayPosition = setting._delayPosition || 400;
    this._widthCard = setting.widthCard;
    this._amountCard = setting.amountCard;
    this._dataRedux$ = setting.data;
    return this._event$;
  }

  public initCard(setting:ISettingCard):Subject<any>{
    if(this._amountHtmlCard < this._amountCard){
      this._lastCardsIndex = this._cardsInfo.length;
      this._amountHtmlCard++;
      let subject = new Subject();
      this._cardsInfo.push(this._createCardInfo(setting.card, this._amountHtmlCard, this._lastCardsIndex, setting.func, subject));
      return subject;
    }
  }

  private _eventSwitch():void{
    this._subscriptionEvent = this._event$.subscribe((event:string) => {
      switch(event){
        case INIT_DATA:
          this._combineCardData$ = this._cardsInfo$
          .do((card) => { if(card.index == 0){ this._subscriptionDataRedux = this._dataRedux$.subscribe((list) => this._dataRedux = list)} })
          .map((card) => { return {card, data:this._dataRedux} })
          .do((card) => console.log(card))
          this._statusData = INIT_GRID_DATA;
          this._initGrid();
          break;
        case SUCCESS_DATA:
          this._statusData = VALID_DATA;
          this._translateScrollDown(this._posLastScroll);
          break;
        case EMPTY_DATA:
          this._statusData = EMPTY_DATA;
          this._translateScrollDown(this._posLastScroll);
          break;
      }
    });
  }
  private _scrollSwitch():void{
    this._scrollSubscription = this._scroll$
    .delay(200)
    .filter((event:any) => event != null)
    .map((event:any) => event.target)
    .map((event:any) => document.documentElement.scrollTop || document.body.scrollTop || 0)
    .subscribe((scroll:number) => {
      if(this._posLastScroll < scroll && scroll >= 0){
        this._translateScrollDown(scroll);
      }else if(this._posLastScroll > scroll && scroll >= 0){
        this._translateScrollTop(scroll);
      }
      this._posLastScroll = scroll;
    });
  }
  private _translateScrollDown(scroll:number):void{
    this._subscriptionCombineCardData = this._combineCardData$
    .delay(200)
    .filter((value:ICombineCardData) => this._statusData != NO_MORE_DATA && value.card.show == true && value.card.top < (scroll - this._body.height))
    .do((value:ICombineCardData) => {
      if(this._statusData == VALID_DATA && !value.data[value.card.index + this._amountCard]){
        this._statusData = WAITING_DATA;
        this._event$.next(MORE_DATA);
        return null;
      }else{
        return value;
      }
    })
    .subscribe( (value:ICombineCardData) => this._scrollDownValue(value), (error:any) => this._scrollDownError(error), () => this._scrollDownComplet() )
  }
  private _translateScrollTop(scroll:number):void{
    this._subscriptionCombineCardData = this._combineCardData$
    .delay(200)
    .filter((res:any) => res.card.show == true && res.card.index >= this._amountCard && res.card.bottom > (scroll + (this._body.height * 2) ) )
    .subscribe( (value:ICombineCardData) => this._scrollTopValue(value), (error:any) => this._scrollTopError(error), () => this._scrollTopComplet() );
  }
  private _scrollDownValue(value:ICombineCardData):void{
    if(this._statusData == VALID_DATA){
      value.card.show = false;
      value.card.elem.nativeElement.classList.remove('loaded')
      value.card.index + this._amountCard <= this._lastCardsIndex ? this._rePosition(this._cardsInfo[value.card.index + this._amountCard], value.data[value.card.index + this._amountCard]) : this._addCard(value);
    }else if(this._statusData == EMPTY_DATA && value.card.index + this._amountCard < value.data.length){
      value.card.show = false;
      value.card.elem.nativeElement.classList.remove('loaded')
      value.card.index + this._amountCard <= this._lastCardsIndex ? this._rePosition(this._cardsInfo[value.card.index + this._amountCard], value.data[value.card.index + this._amountCard]) : this._addCard(value);
    }
  }
  private _scrollDownError(error:any):void{ console.log(error) }
  private _scrollDownComplet():void{}
  private _scrollTopValue(value:ICombineCardData):void{
    value.card.show = false;
    value.card.elem.nativeElement.classList.remove('loaded')
    this._rePosition(this._cardsInfo[value.card.index - this._amountCard], value.data[value.card.index - this._amountCard])
  }
  private _scrollTopError(error:any):void{ console.log(error) }
  private _scrollTopComplet():void{}
  private _getTransformProperty():void{
    let style = document.createElement('div').style;
    let transform;
    let vendorProp;
    if(style[vendorProp = 'webkitTransform'] !== undefined){ this._transform = vendorProp }
    if(style[vendorProp = 'msTransform'] !== undefined){ this._transform = vendorProp }
    if(style[vendorProp = 'transform'] !== undefined){ this._transform = vendorProp }
  }
  private _createCardInfo(elem:ElementRef, number:number, index:number, func:any, emit:Subject<any>):ICardInfo{ return {elem, number, index, height:null, top:null, bottom:null, left:null, show:true, func, emit} }
  private _initGridValue(value:ICombineCardData):void{
    this._statusData = VALID_DATA;
    value.card.index == value.data.length ? this._statusData = NO_MORE_DATA : this._setPosition(value, true)
  }
  private _initGridError(error:any):void{ console.log(error) }
  private _initGridComplet():void{}
  private _initGrid():void{
    this._container.nativeElement.style.position = 'relative';
    this._changeColomn();
    for(let i = 0; i < this._cols; i++){
      this._itemsPosX.push(i * this._widthCard + (this._gutter * (i + 1)));
      this._itemsPosY.push(this._gutter);
    }
    this._subscriptionCombineCardDataInit = this._cardsInfo$
    .do((card) => { if(card.index == 0){ this._subscriptionDataRedux = this._dataRedux$.subscribe((list) => this._dataRedux = list)} })
    .filter((card) => card.index <= this._dataRedux.length)
    .map((card) => { return {card, data:this._dataRedux} })
    .subscribe( (value:ICombineCardData) => this._initGridValue(value), (error:any) => this._initGridError(error), () => this._initGridComplet() );
  }
  private _addCard(value:any):void{
    this._lastCardsIndex = this._cardsInfo.length;
    let cardInfo = this._createCardInfo(value.card.elem, value.card.number, this._lastCardsIndex, value.card.func, value.card.emit);
    this._cardsInfo.push(cardInfo);
    this._setPosition({card: cardInfo, data:value.data});
  }
  private _changeColomn():void{
    this._container.nativeElement.style.width = '';
    this._containerWidth = this._container.nativeElement.getBoundingClientRect().width;
    this._cols = Math.max(Math.floor((this._containerWidth - this._gutter) / (this._widthCard + this._gutter)), 1);
    this._container.nativeElement.style.width =  `${this._widthCard * this._cols + (this._gutter * (this._cols + 1))}px`;
  }
  private _setPosition(info, init=false):void{
    console.log('set pos merde')
    info.card.emit.next(info.data[info.card.index])
    info.card.func(info.card, info.data[info.card.index])
    .then(() => {
        let firstItem, itemIndex, posX, posY;
        if(this._shorterFirst){
          firstItem = this._itemsPosY.slice(0).sort((a, b) => { return a - b }).shift();
          itemIndex = this._itemsPosY.indexOf(firstItem);
        }else{
          itemIndex = this._cardsInfo.length % this._cols;
        }
        info.card.elem.nativeElement.style.width = `${this._widthCard}px`
        posX = this._itemsPosX[itemIndex];
        posY = this._itemsPosY[itemIndex];
        // info.card.elem.nativeElement.style.position = 'absolute';
        info.card.elem.nativeElement.style[this._transform] = `translate3d(${posX}px, ${posY}px, 0)`;
        info.card.top = posY;
        info.card.left = posX;
        info.card.height = info.card.elem.nativeElement.getBoundingClientRect().height;
        info.card.bottom = posY + info.card.elem.nativeElement.getBoundingClientRect().height;
        this._itemsPosY[itemIndex] += info.card.elem.nativeElement.clientHeight + this._gutter;
        this._container.nativeElement.style.height = `${this._itemsPosY.slice(0).sort((a, b) => { return a - b }).pop() + 40}px`;
        setTimeout( () => { info.card.elem.nativeElement.classList.add('loaded') }, init ? this._delayInit : this._delayPosition);
      }
    )
  }
  private _rePosition(card, data):void{
    card.emit.next(data)
    card.func(card, data)
    .then(() => {
      card.elem.nativeElement.style[this._transform] = `translate3d(${card.left}px, ${card.top}px, 0)`;
      card.elem.nativeElement.style.height = `${card.height}px`;
      card.show = true
      setTimeout( () => { card.elem.nativeElement.classList.add('loaded') }, this._delayPosition);
    })
  }
  private _resizeValue(value:ICombineCardData):void{
    let firstItem, itemIndex, posX, posY;
    if(this._shorterFirst){
      firstItem = this._itemsPosY.slice(0).sort((a, b) => { return a - b }).shift();
      itemIndex = this._itemsPosY.indexOf(firstItem);
    }else{
      itemIndex = this._cardsInfo.length % this._cols;
    }
    posX = this._itemsPosX[itemIndex];
    posY = this._itemsPosY[itemIndex];
    value.card.elem.nativeElement.style[this._transform] = `translate3d(${posX}px, ${posY}px, 0)`;
    value.card.top = posY;
    value.card.left = posX;
    value.card.bottom = posY + value.card.height;
    this._itemsPosY[itemIndex] += value.card.height + this._gutter;
    this._container.nativeElement.style.height = `${this._itemsPosY.slice(0).sort((a, b) => { return a - b }).pop() + 40}px`;
  }
  private _resizeError(error:any):void{ console.log(error) }
  private _resizeComplet():void{ this._isNewResize = false; }
  private _resize():void{
    this._resizeSubscription = this._resize$
    .delay(200)
    .filter(() => this._statusData != INIT_GRID_DATA && this._statusData != WAITING_DATA && this._isNewResize == false)
    .subscribe(data => {
      if(data != null){
        this._isNewResize = true
        this._changeColomn();
        this._itemsPosX = [];
        this._itemsPosY = [];
        for(let i = 0; i < this._cols; i++){
          this._itemsPosX.push(i * this._widthCard + (this._gutter * (i + 1)));
          this._itemsPosY.push(this._gutter);
        }
        this._isResizeShowTrue = false;
        this._subscriptionCombineCardDataResize = this._cardsInfo$
        .do((card) => { if(card.show && !this._isResizeShowTrue){ this._isResizeShowTrue = true} })
        .filter((card) => card.show == true || this._isResizeShowTrue == false)
        .do((card) => { if(card.index == 0){ this._subscriptionDataRedux = this._dataRedux$.subscribe((list) => this._dataRedux = list)} })
        .map((card) => { return {card, data:this._dataRedux} })
        .subscribe( (value:ICombineCardData) => this._resizeValue(value), (error:any) => this._resizeError(error), () => this._resizeComplet() );
      }
    })
  }
}
