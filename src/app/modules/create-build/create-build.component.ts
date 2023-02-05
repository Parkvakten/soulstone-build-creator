import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable} from 'rxjs';
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
  selectedRuneIndex: number = -1;
  filterString:string = '';
  localStorageBuild: IBuild | null = null;

  
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

$getRunes: Observable<IRune[]> = this.idbService.getAllItems$<IRune>(this.idbService.db.runes)
.pipe(
  map((res)=>{
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
    localStorage.setItem('inprogressBuild',JSON.stringify(build))
    this.idbService.getTableLength(this.idbService.db.builds).then((res)=>{
      build.id = res+1;
      this.buildService._setNewCurrentBuild(build);
      //return this.idbService.addItem$(this.idbService.db.builds,build)
    })
    
   }

   saveBuild(){
    return this.idbService.addItem$(this.idbService.db.builds,this.currentBuild)
   }

   checkNextButton():boolean{
    /*
      sista steget är runes, så som det finns ett värde i runes så ska den alltid returnera true
    */

    let returnBool: boolean = false;
    if(this.currentBuild){
      if(this.currentBuild.stepNumber === 0 && this.currentBuild.selectedCharacter !== undefined|| this.currentBuild.stepNumber === 1 && this.currentBuild.selectedWeapon !== undefined || this.currentBuild.selectedRunes !== undefined){
        returnBool = true
      }   
      }
    
    return returnBool;
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

   setSelectedRuneIndex(index:number){
    this.selectedRuneIndex = index;
   }
   setSelectedSkillIndex(index:number){
    this.selectedSkillIndex = index;
   }
   setSelected(index: number){
    this.selectedIndex = index
   }
  ngOnInit(): void {
    const localBuild = localStorage.getItem('inprogressBuild');
    if(localBuild !== null){
      this.localStorageBuild = JSON.parse(localBuild) as IBuild;
    }
  }

  

}

