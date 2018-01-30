import { Component, OnInit } from '@angular/core';
import { NgRedux, RDXRootState} from '../../store'

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private _redux:NgRedux<RDXRootState>) { }

  ngOnInit() {
  }

}
