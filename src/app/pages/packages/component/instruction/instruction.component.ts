import { Component, OnInit, Input, OnChanges } from '@angular/core';

export interface IInstruction {
	tag:string,
	attributes:any,
	value:string,
	classes:any,
	content:IInstruction[]
}

interface IColorInstruction {
	el:string,
	tag:string,
	attributes:string,
	value:string,
	classes:string
}

@Component({
  selector: 'instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit, OnChanges {

	@Input() config: IInstruction
	@Input() level:number

	public color: IColorInstruction = {
		el: null,
		tag: null,
		attributes: null,
		value: null,
		classes: null
	}

	public keyName: string[] = [];
	public className: string[] = [];
	public notClosings = ['string', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']
	public tab:string
	public value:string

  constructor(){
  }

  ngOnInit() {
  	this.value = this.config.value
  	this.level = this.level || 0
  	this.tab = Array(this.level + 1).join('\u0009')
  	if (this.config.content.length === 1 && this.config.content[0].tag === 'string') {
  		this.value = this.config.content[0].value
  		this.config.content = []
  	}
		this.color.el = '#464646',
		this.color.tag = '#F92672',
		this.color.attributes = '#09B06B',
		this.color.value = '#ED8220',
		this.color.classes = 'slateBlue'
  	for(let key in this.config.attributes){
  		this.keyName.push(key);
  	}
  }

  ngOnChanges(){
  	this.className = [];
  	for(let key in this.config.classes){
  		if(this.config.classes[key]){
  			this.className.push(key);
  		}
  	}
  }



}
