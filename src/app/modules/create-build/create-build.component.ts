import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Observable, of, switchMap, take } from 'rxjs';
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
  selectedSkillIndex: number = -1;
  
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
  

  constructor(private idbService: IdbService, private buildService: BuildService,private router: Router,private route:ActivatedRoute) {
    this.buildService.currentBuild$.subscribe((res)=>{      
      this.currentBuild = res;
    })}
  
    goBack(){
      this.router.navigate([
        '/create'
      ],{relativeTo:this.route})
    }

   addBuild(){
    let build: IBuild = generateBuild();
    
    this.idbService.getTableLength(this.idbService.db.builds).then((res)=>{
      build.id = res+1;
      this.buildService._setNewCurrentBuild(build);
      return this.idbService.addItem$(this.idbService.db.builds,build)
    })
    
   }

   checkNextButton():boolean{
    /*
      sista steget är runes, så som det finns ett värde i runes så ska den alltid returnera true
    */

    let returnBool: boolean = false;
    if(this.currentBuild){
      if(this.currentBuild.stepNumber === 0 && this.currentBuild.selectedWeapon !== undefined){
        returnBool = true
      }else if(this.currentBuild.stepNumber === 1 && this.currentBuild.selectedWeapon !== undefined){
        returnBool = true
      }else if(this.currentBuild.selectedRunes !== undefined){
        returnBool = true
      }
     
          
      }
    
    return returnBool;
   }

   filterSkills(eventString: Event){
      const value = (eventString.target as HTMLInputElement).value;
      this.$getSkills.pipe(map((res)=>{
        res.filter((r)=>{
          console.log('value',value)
          return r.activeSkill.title === value
        })
      })).subscribe()
   }

   previousStep(){
    if(this.currentBuild){
    this.buildService.previousStep(this.currentBuild)
  }
   }

   nextStep(){
    if(this.currentBuild){
      this.buildService.nextStep(this.currentBuild)
    }
    
   }

   
   setSelectedSkillIndex(index:number){
    this.selectedSkillIndex = index;
   }
   setSelected(index: number){
    this.selectedIndex = index
   }
  ngOnInit(): void {
  }

  

}

@Pipe({
  name: 'filterSkills'
})
export class SkillsFilterPipe implements PipeTransform{
  transform(skills:IActiveSkill[],filterTerm?: any): IActiveSkill[] {
    if(filterTerm === undefined){
      return skills
    }else{
      return skills.filter((skill)=>{
        return skill.activeSkill.title.toLowerCase() === filterTerm.toLowerCase()
      })
    }
  }
  
}
