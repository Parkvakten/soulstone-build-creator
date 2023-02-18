import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IActiveSkill } from 'src/app/resources/models/skill/skill';

import { IdbService } from 'src/app/resources/services/idb/idb.service';

@Component({
  selector: 'app-view-skills',
  templateUrl: './view-skills.component.html',
  styleUrls: ['./view-skills.component.css']
})
export class ViewSkillsComponent implements OnInit {

  constructor(private idbService:IdbService) { }
  filterString:string = '';
  
$getSkills: Observable<IActiveSkill[]> = this.idbService.getAllItems$<IActiveSkill>(this.idbService.db.active_skills).pipe(map((res)=>{
  return res;
}))
  ngOnInit(): void {
  }

}
