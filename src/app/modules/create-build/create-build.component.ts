import { Component, OnInit } from '@angular/core';
import { map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { ICharacter } from 'src/app/resources/models/character/character';
import { IRune } from 'src/app/resources/models/rune/rune';
import { IActiveSkill, IStatusEffect } from 'src/app/resources/models/skill/skill';
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


$getStatusEffects: Observable<IStatusEffect[]> = this.idbService.getAllItems$<IStatusEffect>(this.idbService.db.status_effects).pipe(map((res)=>{
  console.log('res for get statusEffects',res);
  return res;
}))
  

$getSkills: Observable<IActiveSkill> = this.idbService.getAllItems$<IActiveSkill>(this.idbService.db.active_skills).pipe(switchMap((res)=>{
  console.log('res for get skills',res);
  res.forEach((skill)=>{
    
    if(skill.statusEffect !== undefined){
      console.log('skill',skill)
      return this.idbService.getItemByIndex$<IStatusEffect>(this.idbService.db.status_effects,'effectTitle',undefined,skill.statusEffect).pipe(mergeMap((statusEffect: IStatusEffect[])=>{
        console.log('got status effect',statusEffect)
        skill.statusEffectObj = statusEffect;
        console.log(skill.statusEffectObj)
        return statusEffect
      }))
    }else {
      return res
    }
  })
  return res;
}))

$getRunes: Observable<IRune[]> = this.idbService.getAllItems$<IRune>(this.idbService.db.runes).pipe(map((res)=>{
  
  console.log('res for get runes',res);
  return res;
}))

  constructor(private idbService: IdbService) { }

  ngOnInit(): void {
  }


}
