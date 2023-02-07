import { Component, Input } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { IActiveSkill, IStatusEffect } from 'src/app/resources/models/skill/skill';

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



  formatSkillText(){
    let element = document.getElementById(this.skill.activeSkill.title);
    let str = document.getElementById(this.skill.activeSkill.title)?.innerHTML; 
    
      this.skill.statusEffectObj?.forEach((object)=>{
        if(str !== undefined && str !== '' && !str.includes('<')){
        let substring:any = str.match(object.effectTitle)
      if(substring !== null){

      let res = str.replace(substring, "<span style='color:"+object.effectHighligtColor+"'>"+substring+"</span>");
      if(element){
        element.innerHTML = res;
      }}
    }
      })
      
      
      
    
    
  }

}
