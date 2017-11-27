import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-scss-block',
  // template: `<pre [ngClass]="{'ds-block': parent}"><code><span class="ds-prefix">{{getContentPrefix()}}</span><span class="ds-content-{{getContentType()}}">{{content}}</span><span class="ds-selector">{{selector}}</span><span class="first-brace">&#123;</span><ng-content></ng-content><span class="last-brace">&#125;</span></code></pre>`,
  template: `<span class="ds-block-prefix">{{getContentPrefix()}}</span><span class="ds-block-value-{{getValueType(value)}}">{{value}}</span><span class="first-brace">&#123;</span><ng-content></ng-content><span class="last-brace">&#125;</span>`,
  styles: [`
    :host {
      display: block;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      padding-left: 18px;
      margin-bottom: 6px;
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

    .last-brace {
      margin-left: -35px;
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
