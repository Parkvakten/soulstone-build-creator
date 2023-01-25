import { Component, Input, OnInit } from '@angular/core';
import { map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { generateBuild, IBuild } from 'src/app/resources/models/build/build';
import { ICharacter } from 'src/app/resources/models/character/character';
import { IRune } from 'src/app/resources/models/rune/rune';
import { IActiveSkill, IStatusEffect } from 'src/app/resources/models/skill/skill';
import { IWeapon } from 'src/app/resources/models/weapon/weapon';
import { BuildService } from 'src/app/resources/services/build/build.service';
import { IdbService } from 'src/app/resources/services/idb/idb.service';

@Component({
  selector: 'app-create-build',
  templateUrl: './create-build.component.html',
  styleUrls: ['./create-build.component.css']
})
  

export class CreateBuildComponent implements OnInit {
  selectedIndex: number = -1;
  

$getCharacters: Observable<ICharacter[]> = this.idbService.getAllItems$<ICharacter>(this.idbService.db.characters).pipe(map((res)=>{
  console.log('res for get characters',res);
  return res;
  
}))

$getWeapons: Observable<IWeapon[]> = this.idbService.getAllItems$<IWeapon>(this.idbService.db.weapons).pipe(map((res)=>{
  console.log('res for get weapons',res)
  return res;
}))


$getStatusEffects: Observable<IStatusEffect[]> = this.idbService.getAllItems$<IStatusEffect>(this.idbService.db.status_effects).pipe(map((res)=>{
  console.log('res for get status effects',res)
  return res;
}))
  

$getSkills: Observable<IActiveSkill[]> = this.idbService.getAllItems$<IActiveSkill>(this.idbService.db.active_skills).pipe(map((res)=>{
  console.log('res for get skills',res);
  return res;
}))

$getRunes: Observable<IRune[]> = this.idbService.getAllItems$<IRune>(this.idbService.db.runes).pipe(map((res)=>{
  console.log('res for get runes',res);
  return res;
}))

$getBuilds: Observable<IBuild[]> = this.idbService.getAllItems$<IBuild>(this.idbService.db.builds)
.pipe(
  map((res)=>{
    console.log('res for get builds',res);
    return res
  })
)

  currentBuild: IBuild | null = null

  constructor(private idbService: IdbService, private buildService: BuildService) {
    this.buildService.currentBuild$.subscribe((res)=>{      
      this.currentBuild = res;
    })}
  

   addBuild(){
    let build: IBuild = generateBuild();
    
    this.idbService.getTableLength(this.idbService.db.builds).then((res)=>{
      build.id = res+1;
      this.buildService._setNewCurrentBuild(build);
      return this.idbService.addItem$(this.idbService.db.builds,build)
    })
    
   }

   navigateToBuild(build:IBuild){
    this.buildService._setNewCurrentBuild(build)
   }
   
   setSelected(index: number){
    this.selectedIndex = index
   }
  ngOnInit(): void {
  }

  

}
