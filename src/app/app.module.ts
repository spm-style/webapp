import { BrowserModule }                                                        from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject, isDevMode }                     from '@angular/core';
import { isPlatformBrowser }                                                    from '@angular/common';
import { NgReduxModule, DevToolsExtension }                                     from '@angular-redux/store'
import { ReactiveFormsModule, FormsModule }                                     from '@angular/forms';
import { HttpModule }                                                           from '@angular/http';
                                                                                // Router
import { AppRoutingModule }                                                     from './app.routing';
                                                                                // Redux
import { rootReducer, ROOT_INITIAL_STATE, NgRedux }                             from './store';
                                                                                // Skell
import { AppComponent }                                                         from './app.component';
                                                                                // Pages
import { HomeComponent }                                                        from './pages/home/home.component';
import { NotFoundComponent }                                                    from './pages/not-found/not-found.component';
import { ReportingAbuseComponent }                                              from './pages/reporting-abuse/reporting-abuse.component';
import { PricingComponent }                                                     from './pages/pricing/pricing.component';
import { AboutComponent }                                                       from './pages/about/about.component';
import { ContactComponent }                                                     from './pages/contact/contact.component';
                                                                                // Component
import { HeaderComponent }                                                      from './component/header/header.component';
import { FooterComponent }                                                      from './component/footer/footer.component';
import { VideoJsComponent }                                                     from './component/video-js/video-js.component';
                                                                                // Service
import { ApiContactService }                                                    from './service/api-contact.service'
import { ApiPackageOriginService }                                              from './service/api-package-origin.service'
import { ApiUserService }                                                       from './service/api-user.service'
import { LocalstorageService }                                                  from './service/localstorage.service'
import { PopupModule }                                                          from './modules/popup/popup.module'
import { ScrollDirective } from './directives/scroll.directive'
import { RouteReuseStrategy } from '@angular/router'
import { CustomReuseStrategy } from './customReuseStrategy.class';
import { Title } from '@angular/platform-browser'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    PricingComponent,
    AboutComponent,
    ContactComponent,
    ReportingAbuseComponent,
    VideoJsComponent,
    ScrollDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'spm-web-app' }),
    NgReduxModule,
    AppRoutingModule,
    PopupModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    ApiContactService,
    ApiPackageOriginService,
    ApiUserService,
    LocalstorageService,
    Title,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  private _id:string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    private _ngRedux:NgRedux<any>,
    private _devTools:DevToolsExtension
  ){
    !isPlatformBrowser(platformId) ? console.log(`Running on the server with appId=${appId}`) : console.log(`Running in the browser with appId=${appId}`);

    let enhancers = isDevMode() ? [_devTools.enhancer()] : [];
    _ngRedux.configureStore(rootReducer, ROOT_INITIAL_STATE, [], enhancers);
  }

}
