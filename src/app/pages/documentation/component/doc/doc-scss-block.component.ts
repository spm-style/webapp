import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-block',
  template: `<span class="ds-block-prefix">{{getContentPrefix()}}</span><span class="ds-block-value-{{getValueType(value)}}">{{value}}</span><span class="first-brace">&#123;</span><ng-content></ng-content><span>&#125;</span>`,
  styles: [`
    :host {
      display: block;
      padding-left: 15px;
      padding-bottom: 5px;
      margin-top: 6px;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      white-space: pre-line;
    }

    .ds-block-value-id{
      color: lightblue;
    }

    .ds-block-value-class{
      color: lightgreen;
    }

    .ds-block-value-selector, .ds-block-prefix{
      color: #D36169;
    }

    .first-brace {
      padding-left: 4px;
    }
  `]
})
export class DocScssBlockComponent {

  @Input('value') readonly value:string;
  @Input('selector') readonly selector:string;
  @Input('prefix') readonly prefix:string;

  public getValueType = (value:string) => {
    if(this.value.startsWith('.', 0)){
      return 'class';
    }else if(this.value.startsWith('#', 0)){
      return 'id';
    }else{
      return 'selector';
    }
  }

  public getContentPrefix = () => {
    if(this.prefix == 'and'){
      return '&';
    }
  }
}

// @Input('content') readonly content:string;
// @Input('selector') readonly selector:string;
// @Input('parent') readonly parent:boolean = false;


// public classContent:string = '';
//

//




    // .ds-block{
    //   background-color: #000;
    //   border-left: 4px solid red;
    //   border-radius: 4px;
    //   padding: 4px 10px;
    //   color: white;
    //   margin-left: 0;
    // }
    //
    // .ds-block .first-brace{
    //   padding-left: 6px;
    // }
    //
    // .ds-block .last-brace {
    //   margin-left: -16px;
    // }
    //
    // .ds-block .ds-prefix {
    //   color: red;
    // }
    //

    //
    // .ds-selector{
    //   color: orange;
    // }
