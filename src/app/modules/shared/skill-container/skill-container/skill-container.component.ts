import { Component, Input } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IActiveSkill, IStatusEffect, StatusEffectTitle } from 'src/app/resources/models/skill/skill';
import { IdbService } from 'src/app/resources/services/idb/idb.service';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
  styleUrls: ['./skill-container.component.css']
})
export class SkillContainerComponent {


  @Input() skill!: IActiveSkill;
  /**
   *
   */
  constructor(private idbService: IdbService) {
  
    
  }

   getStatusEffect$(statusEffect: StatusEffectTitle[] | undefined):Observable<IStatusEffect[]>{
    //return of([]);
     return this.idbService.getItemByIndex$<IStatusEffect>(this.idbService.db.status_effects,'effectTitle',undefined, statusEffect).pipe(map((res)=>{
      console.log('res in get status effect')
      return res;
     }))

   }

}
