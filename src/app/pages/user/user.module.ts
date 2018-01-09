import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRouterModule } from './user.router';
import { UserComponent } from './user.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PublicComponent } from './pages/public/public.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { PreviewComponent } from './pages/preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    UserRouterModule
  ],
  declarations: [
    UserComponent,
    SettingsComponent,
    PublicComponent,
    PackagesComponent,
    PreviewComponent
  ]
})
export class UserModule { }
