import { Component, Input } from '@angular/core';
import { contains } from 'jquery';
import { IBuild } from 'src/app/resources/models/build/build';
import { IRune } from 'src/app/resources/models/rune/rune';
import { IActiveSkill } from 'src/app/resources/models/skill/skill';
import { BuildService } from 'src/app/resources/services/build/build.service';

@Component({
  selector: 'app-selector-base',
  templateUrl: './selector-base.component.html',
  styleUrls: ['./selector-base.component.css']
})
export class SelectorBaseComponent {

  /**
   *
   */

  @Input() currentBuild!: IBuild;
  @Input() selectItem!: ISelectItem; 
  @Input() buttonText: string = '';
  @Input() selected: boolean = false;
  @Input() selectedIndex: number = -1;
  @Input() multiple: boolean = true;
  constructor(private buildService:BuildService) {

  }



  saveItem(selectItem: ISelectItem){
    switch (selectItem.objectKey) {
      
      
        case 'selectedRunes':
             if(this.currentBuild.selectedRunes === undefined){
              this.currentBuild.selectedRunes = [selectItem.item]
             }else{
              
               if(!this.checkIfRuneExists(selectItem.item) && this.currentBuild.selectedRunes.length < 5 && this.checkRuneCost(selectItem.item)){
                this.currentBuild.selectedRunes.push(selectItem.item);
                this.buildService._updateBuild(this.currentBuild)
               }
             }

            if(this.currentBuild.selectedRunes !== undefined && (this.currentBuild.selectedRunes.length >= 5 || this.getTotalRuneCost() === 10)){
                this.buildService.nextStep(this.currentBuild)
            }
         
        break;
        
      case 'selectedSkills':
        if(this.currentBuild.selectedSkills === undefined){
          this.currentBuild.selectedSkills = [selectItem.item]
        }else{
          //Check if there are any runes selected, check if the selected skill already exists in selectedSkills
          if(this.checkIfSkillExists(selectItem.item)){
            //If selectedRunes includes Singular Focus, we can add more than one of the same skill
            if(this.currentBuild.selectedRunes !== undefined && this.currentBuild.selectedRunes.filter((rune)=> {
              return rune.title === 'Singular Focus'
            }).length === 1 && this.currentBuild.selectedSkills.length < 6){
              this.currentBuild.selectedSkills.push(selectItem.item);
              this.buildService._updateBuild(this.currentBuild);
            }
            
            // Else if Singular Focus does not exist
            // And the skill does not exist in the selectedSkills array
            // And there is not more than 6 skills in the array.
            // Add the skill
          }else if(this.currentBuild.selectedSkills.length < 6 && !this.checkIfSkillExists(selectItem.item)){
            this.currentBuild.selectedSkills.push(selectItem.item);
              this.buildService._updateBuild(this.currentBuild);
          }
          
          if(this.currentBuild.selectedSkills !== undefined && this.currentBuild.selectedSkills.length >= 6) {
              this.buildService.nextStep(this.currentBuild)
            }
        }
        break;
      default:
        (this.currentBuild as any)[selectItem.objectKey] = selectItem.item;
      this.buildService._updateBuild(this.currentBuild);

        this.buildService.nextStep(this.currentBuild)
        break;
    }
  }

  getTotalRuneCost():number{
    let totalCost: number = 0;
    if(this.currentBuild.selectedRunes !== undefined && this.currentBuild.selectedRunes.length > 0){
      this.currentBuild.selectedRunes.forEach((selectedRune)=>{
        totalCost = totalCost +selectedRune.runeCost
      })
      return totalCost
    }else{
      return totalCost
    }
  }

  checkIfRuneExists(newRune: IRune):boolean{
    //Return false if the new rune does not exist in the currently selected runes
    //Return true if the new rune does exist in the currently selected runes
    if(this.currentBuild.selectedRunes !== undefined){
      if(this.currentBuild.selectedRunes.filter((rune)=>{
        return (rune.title === newRune.title || rune.id === newRune.id)
      }).length === 1){
        return true
      }else{
        return false
      }
    }else{
      return false;
    }
  }

  checkRuneCost(rune: IRune):boolean{
    //Max runicpower is 10
    //Return true if more runes can be added
    //return false if no more runes can be added
    if(this.currentBuild.selectedRunes !== undefined){
      if(this.currentBuild.selectedRunes.length > 0){
        /*
        Loop through the existing runes and add up the total runecost.
        Check if the new rune can be added to the existing runes without the total runecost to go over 10
        */
        if(this.getTotalRuneCost() + rune.runeCost <= 10){
          return true
        }else{
          return false}
      }else{
         return true
      }
    }else{
      return true;
    }
  }

  checkIfSkillExists(newSkill: IActiveSkill):boolean{
     //Return false if the new skill does not exist in the currently selected skills
    //Return true if the new skill does exist in the currently selected skills
    if(this.currentBuild.selectedSkills !== undefined){
      if(this.currentBuild.selectedSkills.filter((skill)=>{
        return (skill.activeSkill.title === newSkill.activeSkill.title || skill.id === newSkill.id)
      }).length === 1){
        return true
      }else{
        return false
      }
    }else{
      return false;
    }
  }

  nextStep(){
  return this.buildService.nextStep(this.currentBuild);
}

previousStep(){
  return this.buildService.previousStep(this.currentBuild);
}


}


export interface ISelectItem {
  objectKey: string;
  item: any
}