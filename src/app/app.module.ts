import { BrowserModule, Title }                                                 from '@angular/platform-browser'
import { NgModule, PLATFORM_ID, APP_ID, Inject, isDevMode }                     from '@angular/core'
import { isPlatformBrowser }                                                    from '@angular/common'
import { NgReduxModule, DevToolsExtension, NgRedux }                            from '@angular-redux/store'
import { ReactiveFormsModule, FormsModule }                                     from '@angular/forms'
import { HttpModule }                                                           from '@angular/http'
import { RouteReuseStrategy }                                                   from '@angular/router'
                                                                                // Router
import { AppRoutingModule }                                                     from './app.routing'
import { PipesModule }                                                          from './pipes/pipes.module'
                                                                                // Redux
import { rootReducer, ROOT_INITIAL_STATE }                                      from './store/store'
                                                                                // Skell
import { AppComponent }                                                         from './app.component'
                                                                                // Pages
import { HomeComponent }                                                        from './pages/home/home.component'
import { NotFoundComponent }                                                    from './pages/not-found/not-found.component'
import { ReportingAbuseComponent }                                              from './pages/reporting-abuse/reporting-abuse.component'
import { PricingComponent }                                                     from './pages/pricing/pricing.component'
import { AboutComponent }                                                       from './pages/about/about.component'
import { ContactComponent }                                                     from './pages/contact/contact.component'
import { UserComponent }                                                        from './pages/user/user.component'
import { AccountVerificationComponent }                                         from './pages/account-verification/account-verification.component';
import { PasswordResetComponent }                                               from './pages/password-reset/password-reset.component';
import { PasswordForgetComponent }                                              from './pages/password-forget/password-forget.component';
                                                                                // Component
import { HeaderComponent }                                                      from './component/header/header.component'
import { FooterComponent }                                                      from './component/footer/footer.component'
import { VideoJsComponent }                                                     from './component/video-js/video-js.component'
                                                                                // Service
import { ApiContactService }                                                    from './service/api-contact.service'
import { ApiPackageOriginService }                                              from './service/api-package-origin.service'
import { ApiPackageService }                                                    from './service/api-package.service'
import { ApiUserService }                                                       from './service/api-user.service'
import { ApiStatusService }                                                     from './service/api-status.service'
import { CdnStatusService }                                                     from './service/cdn-status.service'
import { LocalstorageService }                                                  from './service/localstorage.service'
                                                                                // Modules
import { PopupModule }                                                          from './modules/popup/popup.module'
                                                                                // Directives
import { ScrollDirective }                                                      from './directives/scroll.directive'
                                                                                // Classes
import { CustomReuseStrategy }                                                  from './customReuseStrategy.class';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    VideoJsComponent,
    PricingComponent,
    AboutComponent,
    ContactComponent,
    ReportingAbuseComponent,
    UserComponent,
    ScrollDirective,
    AccountVerificationComponent,
    PasswordResetComponent,
    PasswordForgetComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'spm-web-app' }),
    NgReduxModule,
    AppRoutingModule,
    PopupModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    HttpModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    ApiContactService,
    ApiPackageOriginService,
    ApiUserService,
    ApiPackageService,
    ApiStatusService,
    CdnStatusService,
    LocalstorageService,
    Title
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
    let enhancers = []
    if (isPlatformBrowser(platformId)) {
      enhancers = isDevMode() && _devTools.enhancer() ? [_devTools.enhancer()] : []
    } else { console.log(`Running on the server with appId=${appId}`) }
    _ngRedux.configureStore(rootReducer, ROOT_INITIAL_STATE, [], enhancers)
  }

}
