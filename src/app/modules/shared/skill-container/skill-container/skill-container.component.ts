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


  formatSkillText(text:string){
    
  }

}
