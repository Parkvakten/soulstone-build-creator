import { Component, Input } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { IRune } from 'src/app/resources/models/rune/rune';
import { IActiveSkill } from 'src/app/resources/models/skill/skill';
import { BuildService } from 'src/app/resources/services/build/build.service';

@Component({
  selector: 'app-select-summary',
  templateUrl: './select-summary.component.html',
  styleUrls: ['./select-summary.component.css']
})
export class SelectSummaryComponent {
  showRemove: boolean = false;
  selectedIndex: number = -1;
  @Input() skills: IActiveSkill[] | undefined = [];
  @Input() runes: IRune[] | undefined = []
  @Input() currentBuild!: IBuild;
  
  /**
   *
   */
  constructor(private buildService: BuildService) {
    
    
  }


  showRemoveText(index:number){
    if(this.selectedIndex === index){
      this.showRemove = false;
      this.selectedIndex = -1;
    }else{
      this.selectedIndex = index;
      this.showRemove = true;
    }
   
    
    
  } 

  removeSkill(index: number){
    if(this.skills){
      this.skills.splice(index,1);
      this.currentBuild.selectedSkills = this.skills
      this.buildService._updateBuild(this.currentBuild);
      this.selectedIndex = -1;
      this.showRemove = false;
    }
   
    
  }

  removeRune(index: number){
    if(this.runes){
      this.runes.splice(index,1);
      this.currentBuild.selectedRunes = this.runes
      this.buildService._updateBuild(this.currentBuild);
      this.selectedIndex = -1;
      this.showRemove = false;
    }
  }

  totalCost():number{
    let totalCost: number = 0;
    this.currentBuild.selectedRunes?.forEach((rune)=>{
      totalCost += rune.runeCost;
    })
    return totalCost
  }

}
