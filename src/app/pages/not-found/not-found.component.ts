import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private _location: Location) { }

  public backNavigate() { this._location.back() }

}
