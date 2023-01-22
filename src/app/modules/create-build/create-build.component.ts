import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ICharacter } from 'src/app/resources/models/character/character';
import { IRune } from 'src/app/resources/models/rune/rune';
import { IActiveSkill } from 'src/app/resources/models/skill/skill';
import { IWeapon } from 'src/app/resources/models/weapon/weapon';
import { IdbService } from 'src/app/resources/services/idb/idb.service';

@Component({
  selector: 'app-create-build',
  templateUrl: './create-build.component.html',
  styleUrls: ['./create-build.component.css']
})
export class CreateBuildComponent implements OnInit {
  
$getCharacters: Observable<ICharacter[]> = this.idbService.getAllItems$<ICharacter>(this.idbService.db.characters).pipe(map((res)=>{
  console.log('res for get characters',res);
  return res;
  
}))

$getWeapons: Observable<IWeapon[]> = this.idbService.getAllItems$<IWeapon>(this.idbService.db.weapons).pipe(map((res)=>{
  
  console.log('res for get weapons',res);
  return res;
}))
  

$getSkills: Observable<IActiveSkill[]> = this.idbService.getAllItems$<IActiveSkill>(this.idbService.db.active_skills).pipe(map((res)=>{
  
  console.log('res for get skills',res);
  return res;
}),switchMap((res)=>{
  return res
}))

$getRunes: Observable<IRune[]> = this.idbService.getAllItems$<IRune>(this.idbService.db.runes).pipe(map((res)=>{
  
  console.log('res for get runes',res);
  return res;
}))

  constructor(private idbService: IdbService) { }

  ngOnInit(): void {
  }


}
