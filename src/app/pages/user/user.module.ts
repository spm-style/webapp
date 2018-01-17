import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRouterModule } from './user.router';
import { UserComponent } from './user.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PublicComponent } from './pages/public/public.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { PackageDetailComponent } from './pages/package-detail/package-detail.component';

import { RelativeDatePipe } from '../../pipes/relative-date.pipe';
import { FilterPipe } from '../../pipes/filter.pipe'

@NgModule({
  imports: [
    CommonModule,
    UserRouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RelativeDatePipe,
    FilterPipe,
    UserComponent,
    SettingsComponent,
    PublicComponent,
    PackagesComponent,
    PreviewComponent,
    PackageDetailComponent
  ]
})
export class UserModule { }
