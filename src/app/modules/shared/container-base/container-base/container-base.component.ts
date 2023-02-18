import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { IActiveSkill, IStatusEffect } from 'src/app/resources/models/skill/skill';
import { IStat } from 'src/app/resources/models/stat/stat';

@Component({
  selector: 'app-container-base',
  templateUrl: './container-base.component.html',
  styleUrls: ['./container-base.component.css']
})
export class ContainerBaseComponent{

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
      if(substring !== null){
        
        let color = str.includes('+')? 'var(--positive-color)' : 'var(--negative-color)'
      let res = str.replace(substring, "<span style='color:"+color+"'>"+substring+"</span>");
      if(element){
        element.innerHTML = res;
      }}
      
    }
    
    
  }

}
