import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doc-terminal-instruction',
  template: `<span class="tdi-prefix tdi-prefix-{{prefix}}"></span> <span class="dti-content dti-content-{{classContent}}">{{content}}</span> <span *ngIf="argShow(1)" class="dti-arg dti-arg-{{classArg1}}">{{argContent[0]}}</span> <span *ngIf="argShow(2)" class="dti-arg dti-arg-{{classArg2}}">{{argContent[1]}}</span> <span *ngIf="argShow(3)" class="dti-arg dti-arg-{{classArg3}}">{{argContent[2]}}</span> <span *ngIf="argShow(4)" class="dti-arg dti-arg-{{classArg4}}">{{argContent[3]}}</span>`,
  styleUrls: ['./doc-terminal-instruction.component.scss']
})
export class DocTerminalInstructionComponent implements OnInit {

  @Input('content') readonly content:string;
  @Input('prefix') public prefix:string = 'dollar';
  @Input('type') readonly type:string;
  @Input('arg') readonly argContent:string[];

  private _argShowStatus: boolean[] = [false, false, false, false];
  public classContent:string = ''
  public classArg1:string = '';
  public classArg2:string = '';
  public classArg3:string = '';
  public classArg4:string = '';

  constructor() { }

  ngOnInit() {
    this._instanceType(this.type)
  }

  public argShow = (number:number) => {
    return this._argShowStatus[number - 1];
  }

  private _instanceType = (type:string) => {
    switch(type) {
      case 'inquirer':
        this._argShowStatus[0] = true;
        this.prefix = 'inquirer-ask';
        this.classContent = 'inquirer';
        this.classArg1 = 'selected';
        break;
      case 'inquirer-dim':
        this._argShowStatus[0] = true;
        this._argShowStatus[1] = true;
        this.prefix = 'inquirer-ask';
        this.classContent = 'inquirer';
        this.classArg1 = 'dim1';
        this.classArg2 = 'dim2';
        break;
      case 'inquirer-radio':
        this.prefix = 'inquirer-radio';
        break;
      case 'inquirer-radio-select':
        this.prefix = 'inquirer-radio-select';
        this.classContent = 'inquirer-radio-select';
        break;
      case 'inquirer-checkbox':
        this.prefix = 'inquirer-checkbox';
        break;
      case 'inquirer-checkbox-select':
        this.prefix = 'inquirer-checkbox-select';
        this.classContent = 'inquirer-checkbox-select';
        break;
      case 'inquirer-checkbox-select-active':
        this.prefix = 'inquirer-checkbox-select-active';
        this.classContent = 'inquirer-checkbox-select';
        break;
      default:
        break;
    }
  }

}
