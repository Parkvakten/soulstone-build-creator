import { Component, Input } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IBuild } from 'src/app/resources/models/build/build';
import { IActiveSkill, IStatusEffect, StatusEffectTitle } from 'src/app/resources/models/skill/skill';
import { IdbService } from 'src/app/resources/services/idb/idb.service';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
  styleUrls: ['./skill-container.component.css']
})
export class SkillContainerComponent {

  

  @Input() skill!: IActiveSkill;
  @Input() statusEffects: IStatusEffect[] = [];
  @Input() currentBuild!: IBuild;
  @Input() selected: boolean = false;
    /**
   *
   */
  constructor(private idbService: IdbService) {
  
    
  }


  formatSkillText(){
    let element = document.getElementById(this.skill.activeSkill.title);
    let str = document.getElementById(this.skill.activeSkill.title)?.innerHTML; 
    
      this.skill.statusEffectObj?.forEach((object)=>{
        if(str !== undefined && str !== '' && !str.includes('<')){
        let substring:any = str.match(object.effectTitle)
      if(substring !== null){
        console.log('str',str,'substring',substring)

      let res = str.replace(substring, "<span style='color:"+object.effectHighligtColor+"'>"+substring+"</span>");
      if(element){
        element.innerHTML = res;
      }}
    }
      })
      
      
      
    
    
  }

}
