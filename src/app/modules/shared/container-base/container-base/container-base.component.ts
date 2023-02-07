import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { IActiveSkill, IStatusEffect } from 'src/app/resources/models/skill/skill';
import { IStat } from 'src/app/resources/models/stat/stat';

@Component({
  selector: 'app-container-base',
  templateUrl: './container-base.component.html',
  styleUrls: ['./container-base.component.css']
})
export class ContainerBaseComponent implements OnInit, OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes',changes)
  }
  ngOnInit(): void {
   console.log('title',this.title)
   if(this.skill){console.log('skill',this.skill)}
   
  }

  @Input() currentBuild!: IBuild;
  @Input() title:any = '';
  @Input() selected: boolean = false;
  @Input() selectBaseKey: string = '';
  @Input() selectBaseObject: any;
  @Input() icon?: string = '';
  @Input() stats?: IStat[] = [];
  @Input() description?: string;
  @Input() statusEffect?: IStatusEffect;
  private _skill!: IActiveSkill;
  @Input() set skill(val: any){
    if(val !== undefined){
      console.log('val',val)
      this._skill = val;
    }
  }
  



  getId(type: any, index: number):string{
    let id: string = '';
    id = type + index;
    return id;
  }

  formatStatText(type:any,index:number){
    let element = document.getElementById(this.getId(type,index));
    let str = document.getElementById(this.getId(type,index))?.innerHTML; 
    if(str !== undefined && str !== '' && !str.includes('<')){
      
      let substring:any = str.match(/([+-^%]+)/g)
      console.log('str',str,'substring',substring)
      if(substring !== null){
        
        let color = str.includes('+')? 'var(--positive-color)' : 'var(--negative-color)'
        console.log('color',color)
      let res = str.replace(substring, "<span style='color:"+color+"'>"+substring+"</span>");
      if(element){
        element.innerHTML = res;
      }}
      
    }
    
    
  }

}
