import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { DOCUMENT } from '@angular/platform-browser'
import { FormBuilder, FormGroup } from '@angular/forms'
import { environment } from '../../../../../environments/environment'
import {
  NgRedux,
  RDXRootState,
  IPackage,
  IPackageCurrent,
  IPackageOrigin,
  select,
  Observable,
  FETCH_CURRENT_PACKAGE_ORIGIN,
  CLEAR_CURRENT_PACKAGE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  IResponsiveness,
  IVariables,
  IInstanceVariables,
  IVersions,
  CHANGE_VERSION_CURRENT_PACKAGE,
  IClasses,
  RDXUser,
  FETCH_SEO_DATA
} from '../../../../store'
import { Subscription } from 'rxjs/Subscription';
import { ApiPackageOriginService } from '../../../../service/api-package-origin.service'
import { ApiUserService } from '../../../../service/api-user.service'
import { ApiPackageService } from '../../../../service/api-package.service'
import { LocalstorageService } from '../../../../service/localstorage.service'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'
import { IInstruction } from '../../component/instruction/instruction.component'

interface ICLassModule {
  name:string,
  isUse:boolean,
  elements: Element[]
}

@Component({
  templateUrl: './packages-detail.component.html',
  styleUrls: ['./packages-detail.component.scss']
})
export class PackagesDetailComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') private _iframe:ElementRef
  @ViewChild('overviewUnique') private _overviewUnique:ElementRef
  @ViewChild('rangeScale') private _rangeScale:ElementRef
  @ViewChild('textScale') private _textScale:ElementRef
  @ViewChild('domCode') private _domCode:ElementRef

  @select(['packageOrigin', 'current']) readonly current:Observable<IPackageCurrent>
  @select(['user']) readonly user:Observable<RDXUser>

  private _subUrlParams:Subscription
  private _subApiGetPackage:Subscription
  private _subUser:Subscription
  private _subChangeVersion:Subscription

  private _currentDivice:IResponsiveness
  private _currentOriantation:string = 'portrait'
  private _overviewUniqueWidth:number
  private _originDomaine:string
  private _id:string
  private _versionDownload:IPackageCurrent[] = []

  public classes:ICLassModule[] = []
  public variables:IVariables[] = []
  public isFavorite:boolean = false
  public formVersion:FormGroup
  public formJsVariables:FormGroup
  public jsInput:any[] = []
  public cssInput:any = {}

  public domToCopy:string
  public cdnUrl:string = environment.cdnUrl

public testCode:IInstruction[]

  constructor(
    @Inject(DOCUMENT) private _document:any,
    @Inject(PLATFORM_ID) private _platformId:any,
    private _route: ActivatedRoute,
    private _redux:NgRedux<RDXRootState>,
    private _apiPackageOrigin:ApiPackageOriginService,
    private _apiUser:ApiUserService,
    private _renderer:Renderer2,
    private _formBuilder:FormBuilder,
    private _apiPackage:ApiPackageService,
    private _localStorage:LocalstorageService,
    private _router:Router
  ){}

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this._originDomaine = this._document.domain
      this._document.domain = environment.domaine
    }
    let current:IPackageCurrent = this._redux.getState().packageOrigin.current
    if(!current){
      this._subUrlParams = this._route.params
      .subscribe(params => {
        this._subApiGetPackage = this._apiPackageOrigin.packageOrigin(params['name'])
        .subscribe(
          (response:IPackageOrigin) => {
            this._id = response._id
            this._redux.dispatch({ type: FETCH_CURRENT_PACKAGE_ORIGIN, packageOrigin: response })
            this._initDetailModule(response.distTags.latest.cdn, response.distTags.latest.responsiveness, response.distTags.latest.classes, response.distTags.latest.js.instancesVar)
            this._redux.dispatch({type: FETCH_SEO_DATA, pageName: 'packageDetail',
              opts: {
                title: `${response.name} - spm, build up your design`,
                keywords: `${response.distTags.latest.category}, ${response.distTags.latest.keywords.join(', ')}, package, detail, ${response.distTags.latest.responsiveness.map(a => a.name).join(', ')}, responsive, sandbox, test, design, prototype, spm`,
                description: `${response.distTags.latest.category} ${response.name} detail for spm, style project manager and registry for your front-end applications`,
                canonical: `${environment.wwwUrl}/packages/${response.name}`,
                shortTitle: `${response.name} - spm`,
                image: `${environment.cdnUrl}/overview/preview/${response.preview}`,
                twitterCard: 'summary_large_card'
              }
            })
            this._updateViewsCount(response.name)
          },
          (error:any) => { console.log('current package', error) }
        )
      })
    }else{
      this._id = current._id
      this._initDetailModule(current.cdn, current.responsiveness, current.classes, current.js.instancesVar)
      this._redux.dispatch({type: FETCH_SEO_DATA, pageName: 'packageDetail',
        opts: {
          title: `${current.name} - spm, build up your design`,
          keywords: `${current.category}, ${current.keywords.join(', ')}, package, detail, ${current.responsiveness.map(a => a.name).join(', ')}, responsive, sandbox, test, design, prototype, spm`,
          description: `${current.category} ${current.name} detail for spm, style project manager and registry for your front-end applications`,
          canonical: `${environment.wwwUrl}/packages/${current.name}`,
          shortTitle: `${current.name} - spm`,
          image: `${environment.cdnUrl}/overview/preview/${current.preview}`,
          twitterCard: 'summary_large_card'
        }
      })
      this._updateViewsCount(current.name)
    }

    this.formVersion = this._formBuilder.group({ version:['', []] })

    this._subChangeVersion = this.formVersion.get('version').valueChanges.subscribe((newVersion:string) => {
      let res:IPackageCurrent = this._versionDownload.filter((packageCurrent:IPackageCurrent) => packageCurrent.version == newVersion)[0]
      if(res){
        this._redux.dispatch({ type: CHANGE_VERSION_CURRENT_PACKAGE, packageNewVersion: res })
        this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'packageDetail',
          opts: {
            keywords: `${res.category}, ${res.keywords.join(', ')}, package, detail, ${res.responsiveness.join(', ')}, responsive, sandbox, test, design, prototype, spm`,
            description: `${res.category} ${res.name} detail for spm, style project manager and registry for your front-end applications`
          }
        })
        this._initDetailModule(res.cdn, res.responsiveness, res.classes, res.js.instancesVar)
      }else{
        this._versionDownload.push(this._redux.getState().packageOrigin.current)
        for(let version of this._versionDownload[0].versions){
          if(version.name == newVersion){
            this._apiPackage.changeVersionInCurrentPackage(version.package)
            .subscribe((response:any) => {
              this._redux.dispatch({ type: CHANGE_VERSION_CURRENT_PACKAGE, packageNewVersion: response })
              this._redux.dispatch({ type: FETCH_SEO_DATA, pageName: 'packageDetail',
                opts: {
                  keywords: `${response.category}, ${response.keywords.join(', ')}, package, detail, ${response.responsiveness.join(', ')}, responsive, sandbox, test, design, prototype, spm`,
                  description: `${response.category} ${response.name} detail for spm, style project manager and registry for your front-end applications`
                }
              }) //à remplacer avec la correction des types
              this._initDetailModule(response.cdn, response.responsiveness, response.classes, response.js.instancesVar)
            })
          }
        }
      }
    })
  }


  ngOnDestroy() {
    if (isPlatformBrowser(this._platformId)) { this._document.domain = this._originDomaine }
    // this._document.domain = this._originDomaine
    if (this._subApiGetPackage) { this._subApiGetPackage.unsubscribe() }
    if (this._subUrlParams) { this._subUrlParams.unsubscribe() }
    if (this._subUser) { this._subUser.unsubscribe() }
    if (this._subChangeVersion) { this._subChangeVersion.unsubscribe()}
    this._redux.dispatch({ type: CLEAR_CURRENT_PACKAGE })
  }

    private _initDetailModule(cdn:string, responsiveness:IResponsiveness[], classes:IClasses[], instancesVar:IInstanceVariables[]):void {
    this._iframe.nativeElement.src = `${environment.cdnUrl}/overview/dom/${cdn}`
    this._overviewUniqueWidth = this._overviewUnique.nativeElement.clientWidth - 20
    this._currentOriantation = 'portrait'
    this.changeDevice(responsiveness[0])
    this.classes = []
    this.variables = []
    for(let classModule of classes){
      this.classes.push({
        name: classModule.name,
        isUse: true,
        elements: []
      })
      for(let variable of classModule.variables){ this.variables.push(variable) }
    }
    let tmpFormGroup = {}
    for (let instanceVar of instancesVar) {
      tmpFormGroup[`jsVariable-${instanceVar.name}`] = [instanceVar.value, []]
    }
    this.formJsVariables = this._formBuilder.group(tmpFormGroup)
    if (!this.jsInput.length) {
      for (let instanceVar of instancesVar) { this.jsInput.push(instanceVar.value) }
      this._iframe.nativeElement.onload = () => {
        let iframeDocument = this._iframe.nativeElement.contentDocument
        for (let cssVar in this.cssInput) {
          this._iframe.nativeElement.contentWindow.document.documentElement.style.setProperty(`--${cssVar}`, this.cssInput[cssVar])
        }
        new iframeDocument.spm_start(...this.jsInput, { document: iframeDocument })
      }
    }
  }

  private _setDeviceProperty(device:IResponsiveness, oriantation:string, scale:number = null):void{
    if(!scale){ scale = this._overviewUniqueWidth / (oriantation == 'portrait' ? device.w : device.h) < 1 ? this._overviewUniqueWidth / (oriantation == 'portrait' ? device.w : device.h) : 1 }
    this._renderer.setStyle(this._overviewUnique.nativeElement.children[0], 'width', `${ (oriantation == 'portrait' ? device.w : device.h) * scale }px`)
    this._renderer.setStyle(this._overviewUnique.nativeElement.children[0], 'height', `${ (oriantation == 'portrait' ? device.h : device.w) * scale }px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'transform', `scale(${scale})`)
    this._renderer.setStyle(this._iframe.nativeElement, 'width', `${ oriantation == 'portrait' ? device.w : device.h }px`)
    this._renderer.setStyle(this._iframe.nativeElement, 'height', `${ oriantation == 'portrait' ? device.h : device.w }px`)
    this._rangeScale.nativeElement.value = scale
    this._textScale.nativeElement.value = `${scale * 100}%`;
  }

  private _updateViewsCount(packageOriginName:string):void{
    this._apiPackageOrigin.incrementView(packageOriginName).subscribe(
      (res:any) => {  },
      (err:any) => {  }
    )
  }

  public changeDevice(device:IResponsiveness):void {
    this._currentDivice = device
    this._setDeviceProperty(device, this._currentOriantation)
  }

  public changeOrientation():void {
    this._currentOriantation = this._currentOriantation == 'portrait' ? 'paysage' : 'portrait'
    this._setDeviceProperty(this._currentDivice, this._currentOriantation)
  }

  public changeScaleIframe(scale:string):void {
    if(scale.includes('%')){ scale = scale.slice(0, -1) }
    let tmpScale:number = parseFloat(scale)
    if(tmpScale > 1){ tmpScale = tmpScale / 100 }
    this._setDeviceProperty(this._currentDivice, this._currentOriantation, tmpScale)
  }

  public toggleClass(classModule:ICLassModule):void {
    if(classModule.elements.length == 0){ classModule.elements = this._iframe.nativeElement.contentWindow.document.querySelectorAll(`.${classModule.name}`) }
    for(let element of classModule.elements){
      classModule.isUse ? this._renderer.removeClass(element, classModule.name) : this._renderer.addClass(element, classModule.name)
    }
    classModule.isUse = !classModule.isUse
  }

  public isClassActive(classModule:ICLassModule):boolean{ return classModule.isUse }


  public changeVariableValueCss(variable:IVariables, newValue:string):void {
    this._iframe.nativeElement.contentWindow.document.documentElement.style.setProperty(`--${variable.name}`, newValue)
    variable.value = newValue
    this.cssInput[variable.name] = newValue
  }

  public updateJsVariables(current:IPackageCurrent):void {
    this.jsInput = []
    for (let instanceVar of current.js.instancesVar) {
      this.jsInput.push(this.formJsVariables.value[`jsVariable-${instanceVar.name}`])
    }
    this._iframe.nativeElement.src = this._iframe.nativeElement.src
  }

  public toggleFavorite() {
    if (this._localStorage.isLogged()) {
      let action = this._redux.getState().user.favorites.includes(this._id) ? 'remove' : 'add'
      this._subUser = this._apiUser.favorites(this._id, action)
      .subscribe((data:boolean) => {
        if (data) {
          if (action === 'remove')
            this._redux.dispatch({ type: REMOVE_FAVORITE, favorite: this._id })
          else
            this._redux.dispatch({ type: ADD_FAVORITE, favorite: this._id })
        }
        this._subUser.unsubscribe()
      })
    } else {
      this._router.navigate(['connection', 'sign-in'])
    }
  }

  private _tagToInstruction(tag, str, content = []):IInstruction {
    let result:IInstruction = {
      tag,
      attributes: {},
      classes: {},
      value: null,
      content
    }
    let table = str.split('="')
    for (let i = 0; i < table.length - 1; i++) {
      let property = table[i].split(' ')[table[i].split(' ').length - 1]
      if (property === 'class') {
        for (let key of table[i + 1].split('"')[0].split(' ')) {
          if (key.length) {
            result.classes[key] = true
          }
        }
      } else {
        let index = table[i + 1].indexOf('"')
        result.attributes[property] = index === -1 ? false : table[i + 1].substring(0, index)
      }
    }
    for (let i = 0; i < table.length; i++) {
      let split = table[i].split('"')
      let subSplit = table[i].split(' ')
      if (i && i !== table.length - 1) {
        if (split.length > 1) {
          subSplit = split[1].split(' ')
          for (let index = 0; index < subSplit.length - 1; index++) {
            if (subSplit[index].length) { result.attributes[subSplit[index]] = true }
          }
        }
      } else if (!i && subSplit.length > 2) {
        for (let subI = 1; subI < subSplit.length - 1; subSplit++)
        if (subSplit[subI].length) { result.attributes[subSplit[subI]] = true }
      } else if (i === table.length - 1 && split.length > 1) {
        subSplit = split[1].split(' ')
        for (let item of subSplit) {
          if (item.endsWith('/')) { item = item.slice(0, -1) }
          if (item.length) { result.attributes[item] = true }
        }
      }
    }
    return result
  }

  public domToInstructions(dom:string, index:number = 0):IInstruction[] {
    //1) remove all comments + attention si des chevrons se trouvent dans la string + case insensitive
    if (index === 100) { return [] }
    if (!dom || !dom.length || dom.startsWith('</')) { return [] }
    if (!dom.startsWith('<')) {
      let next = dom.indexOf('<')
      if (next === -1) {
        if (/^([ \t\n])*$/.test(dom)) { return [] }
        return [{
          tag: 'string',
          attributes: {},
          classes: {},
          value: dom,
          content: []
        }]
      } else {
        if (/^([ \t\n])*$/.test(dom.substring(0, next))) { return this.domToInstructions(dom.substring(next), index) }
        return [{
          tag: 'string',
          attributes: {},
          classes: {},
          value: dom.substring(0, next),
          content: []
        }].concat(this.domToInstructions(dom.substring(next), index))
      }
    }
    const notClosings = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']
    let count = 0
    let closingChevron = dom.indexOf('>')
    let table = [closingChevron, dom.indexOf(' ')].filter(x => x >= 0)
    if (!table.length) { return [] }
    let tag = dom.substring(1, Math.min(...table))
    let i, j
    if (notClosings.includes(tag)) {
      let next = dom.indexOf('>')
      return [this._tagToInstruction(tag, dom.substring(1, closingChevron))].concat(next === - 1 ? [] : this.domToInstructions(dom.substring(next + 1), index))
    } else {
      let startIndex = 1
      count++
      while (count !== 0 && startIndex !== -1)
      {
        let i1 = dom.indexOf(`<${tag}>`, startIndex)
        let i2 = dom.indexOf(`<${tag} `, startIndex)
        if (i1 < i2 && i1 !== -1) { i = i1 } else { i = i2 }
        j = dom.indexOf(`</${tag}>`, startIndex)
        if (i < j && i >= 0) {
          count++
          startIndex = i + 1
        } else if (i === -1 || i >= 0 && j >= 0) {
          count--
          startIndex = j + 1
        } else {
          startIndex = -1
        }
      }
      if (startIndex === -1) { return [] }
    }
    let item = this._tagToInstruction(tag, dom.substring(1, closingChevron), this.domToInstructions(dom.substring(closingChevron + 1, j), index + 1))
    if (j + `</${tag}>`.length === dom.length) {
      return [item]
    } else {
      return [item].concat(this.domToInstructions(dom.substring(j + `</${tag}>`.length), index))
    }
  }

  public copyToClipboard(elem){
    let tmpEl = this._renderer.createElement('textarea')
    let text = this._renderer.createText(elem.innerText || elem.textContent)
    this._renderer.appendChild(tmpEl, text)
    this._renderer.appendChild(document.body, tmpEl)
    tmpEl.select()
    document.execCommand("copy");
    this._renderer.addClass(this._document.querySelector('.confirmation'), 'visible')
    this._renderer.removeChild(document.body, tmpEl)
    setTimeout(() => {
      this._renderer.removeClass(this._document.querySelector('.confirmation'), 'visible')
    }, 1000)
  }
}
