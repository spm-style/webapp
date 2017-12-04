import { Component, Input, OnInit } from '@angular/core';
// import { UpperCasePipe } from '@angular/common';

interface CLIParameter {
  type:string,
  info:string
}

@Component({
  selector: 'doc-cli-message',
  template: `<span *ngIf="status" class="dcm-status-color-{{status}}">{{status | uppercase}}</span>{{prefix}} <ng-content></ng-content><span *ngIf="argShow(0)" class="dcm-instanceModule-{{argContent[0].type}}">{{argContent[0].info}}</span>{{separator}}<span *ngIf="argShow(1)" class="dcm-instanceModule-{{argContent[1].type}}">{{argContent[1].info}}</span>`,
  styleUrls: ['./doc-cli-message.component.scss']
})
export class DocCliMessageComponent implements OnInit {
  @Input('type') readonly type:string;
  @Input('arg') readonly argContent:CLIParameter[];
  @Input('level') readonly level:number;

  public status:string;
  public prefix:string = '';
  public separator:string = '';
  private _argShowStatus: boolean[] = [false, false];

  ngOnInit(){
    this._instanceType(this.type)
  }

  public argShow = (number:number) => {
    return this._argShowStatus[number];
  }

  private _instanceType = (type:string) => {
    switch(this.type) {
      case 'warning':
        this.status = 'warning';
        this.prefix = ':';
        break;
      case 'error':
        this.status = 'error';
        this.prefix = ':';
        break;
      case 'success':
        this.status = 'success';
        this.prefix = ':';
        break;
      case 'use':
        this.prefix = '>';
        this._argShowStatus[0] = true;
        this._argShowStatus[1] = true;
        this.separator = ' of module ';
        break;
      case 'use-file':
        this.prefix = '>';
        this._argShowStatus[0] = true;
        break;
      case 'install':
        this._argShowStatus[0] = true;
        break;
      case 'install-dependency':
        this.prefix = `${Array((this.level - 1) * 4 + 1).join(' ')}|_ `;
        if (this.argContent.length === 2){
          this.separator = ` ${Array(20).join('.')} `;
          this._argShowStatus[1] = true;
        } 
        this._argShowStatus[0] = true;
        break;
      case 'install-tree-branch':
        this.prefix = `${Array((this.level - 1) * 4 + 1).join(' ')}|`;
        break;
      default:
        break;
    }
  }
}
