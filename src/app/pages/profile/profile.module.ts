import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { ProfileRouterModule } from './profile.router'
import { PipesModule } from '../../pipes/pipes.module'
import { ProfileComponent } from './profile.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { PublicComponent } from './pages/public/public.component'
import { PackagesComponent } from './pages/packages/packages.component'
import { PackageDetailComponent } from './pages/package-detail/package-detail.component'
import { FilterPipe } from '../../pipes/filter.pipe'

@NgModule({
  imports: [
    CommonModule,
    ProfileRouterModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule
  ],
  declarations: [
    FilterPipe,
    ProfileComponent,
    SettingsComponent,
    PublicComponent,
    PackagesComponent,
    PackageDetailComponent
  ]
})
export class ProfileModule { }
