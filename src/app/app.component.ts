import { Component, OnInit } from '@angular/core';
import { IActiveSkill, IStatusEffect } from './resources/models/skill/skill';
import { IRune } from './resources/models/rune/rune';
import { IWeapon } from './resources/models/weapon/weapon';
import { IdbService } from './resources/services/idb/idb.service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Version } from '@angular/compiler';
import { Versions, VersionService } from './resources/services/version/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  active_skills: IActiveSkill[] = require('../app/resources/JSONS/active_skills.json');
  runes: IRune[] = require('../app/resources/JSONS/runes.json');
  status_effects: IStatusEffect[] = require('../app/resources/JSONS/status_effects.json');
  weapons: IWeapon[]  = require('../app/resources/JSONS/weapons.json');
  //versions: Versions[] = this.getVersionsFromLocalStorage();
  
  constructor(private idbService: IdbService, private versionService: VersionService) {
  }

 /*
 Att göra:
  Fixa bilder för
    -Tom actionbar slots
    -Runor
 */


  ngOnInit(): void {
   //console.log('JSON DATA',this.active_skills,this.runes,this.status_effects,this.weapons)
  
    //Hämta gamla versioner och jämför med dom som finns i JSON filen
    /* 
    active_skills
    runes
    status_effects
    weapons
    */
    //console.log('this.versions',this.versions[0].version)
    
   this.populateIdbWithJSON(this.active_skills,this.runes,this.status_effects,this.weapons).subscribe((res)=> {
    console.log('res',res);
   })
   
   //Hämta data för runor, vapen och skills.
   
  }
  populateIdbWithJSON(active_skills: IActiveSkill[], runes: IRune[], status_effects: IStatusEffect[], weapons: IWeapon[]):Observable<boolean[]> {
  let boolArr: boolean[] = [];
   const active_skills$ =  
  this.versionService.checkVersion(this.versionService.getVersionNumber('active_skills'),JSON.parse(JSON.stringify(active_skills[0])) as Versions).pipe(
  switchMap((res)=> {
    if(res){
      this.versionService.addVersion(JSON.parse(JSON.stringify(this.active_skills[0])) as Versions)
      active_skills.shift();
      return this.idbService.populateSkills$(active_skills)
    }else{
      return of(false)
    }
  }))
   

   const runes$ = this.versionService.checkVersion(this.versionService.getVersionNumber('runes'),JSON.parse(JSON.stringify(runes[0])) as Versions).pipe(
    switchMap((res)=> {
      if(res){
        this.versionService.addVersion(JSON.parse(JSON.stringify(this.runes[0])) as Versions)
        runes.shift()
       
        return this.idbService.populateRunes$(runes)
      }else{
        return of(false)
      }
    }))

   const status_effects$ = this.versionService.checkVersion(this.versionService.getVersionNumber('status_effects'),JSON.parse(JSON.stringify(status_effects[0])) as Versions).pipe(
    switchMap((res)=> {
      if(res){
        this.versionService.addVersion(JSON.parse(JSON.stringify(this.status_effects[0])) as Versions)
        status_effects.shift()
       
        return this.idbService.populateStatusEffects$(status_effects)
      }else{
        return of(false)
      }
    }))

   const weapons$ = this.versionService.checkVersion(this.versionService.getVersionNumber('weapons'),JSON.parse(JSON.stringify(weapons[0])) as Versions).pipe(
    switchMap((res)=> {
      if(res){
        this.versionService.addVersion(JSON.parse(JSON.stringify(this.weapons[0])) as Versions)
        weapons.shift()
        
        return this.idbService.populateWeapons$(weapons)
      }else{
        return of(false)
      }
    }))


  return forkJoin([active_skills$,runes$,status_effects$,weapons$]).pipe(map((addRes: any[])=> {
    addRes.forEach((res)=> {
     boolArr.push(res);
    })
    return boolArr;
   }))
   
  }

  // addVersion(version: Versions){
  //   let versionsObj: Versions[] = [];
  //   let storageVersions: string | null = localStorage.getItem('versions');
  //   if(storageVersions !== null){
  //     versionsObj = JSON.parse(storageVersions);
  //     versionsObj = versionsObj.filter((versionObj)=> {
  //       return versionObj.objectName !==version.objectName
  //     })
  //     versionsObj.push(version);
  //     localStorage.setItem('versions',JSON.stringify(versionsObj))
  //   }else{
  //     versionsObj.push(version)
  //     localStorage.setItem('versions',JSON.stringify(versionsObj))
  //   }
  // }

  // addVersions(){
  //   let versions: string[] = [JSON.stringify(this.active_skills[0]),
  //   JSON.stringify(this.runes[0]),
  //   JSON.stringify(this.status_effects[0]),
  //   JSON.stringify(this.weapons[0])]
    
  //   localStorage.setItem('versions',JSON.stringify(versions)) 
  // }

  // getVersionsFromLocalStorage(): Versions[]{
  //   let storageVersions: string | null = localStorage.getItem('versions');
  //   let versions: Versions[] = [];
  //   if(storageVersions !== null){
      
  //     versions = JSON.parse(storageVersions)
  //     versions.forEach((version,index)=> {
  //       versions[index] = JSON.parse(JSON.stringify(version)) as Versions;
  //     })
  //     return versions;
  //   }else{
  //     return [];
  //   }
    
  // }

  // getVersionNumber(objectName:string):number | undefined{
  //   if(this.versions.length > 0){
  //     let index = this.versions.findIndex((item)=> {
  //       return item.objectName === objectName;
  //     })
  //     return index !== -1 ? this.versions[index].version : undefined;
  //   }else{
  //     return undefined
  //   }
  // }


  // checkVersion(localStorageVersionNumber: number | undefined, newVersionNumber: Versions): Observable<boolean>{
    
  //   //Om versionen i json filen är undefined behöver vi lägga till den då den inte finns.
  //   //Vi laddar även om data
  //   if(localStorageVersionNumber){
  //     if(newVersionNumber.version > localStorageVersionNumber){
  //       return of(true)
  //     }else{
  //       return of(false);
  //     }
  //   }else{
  //     return of(true)
  //   }
    
    
  // }

 


 
  title = 'soul-stone-build-creator';
}

