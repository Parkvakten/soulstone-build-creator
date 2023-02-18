import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { IBuild, IExportString } from 'src/app/resources/models/build/build';
import { BuildService } from 'src/app/resources/services/build/build.service';
import { IdbService } from 'src/app/resources/services/idb/idb.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit, OnDestroy {
  importString:string = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  allSavedBuilds:  IBuild[] = [];
  constructor(private idbService: IdbService, private buildService: BuildService) {

    this.buildService.getBuildsByStatus$('SAVED').pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      this.buildService._setAllSavedBuilds(res);
    })

    this.buildService.allSavedBuilds$.pipe(
      takeUntil(this.destroy$)).subscribe((res)=>{      
        
      this.allSavedBuilds = res;
    })
   }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }

  importBuild(){
    if(this.importString!== ''){
       this.genereateBuildFromExportString(JSON.parse(this.importString) as IExportString)
    }
  }

  genereateBuildFromExportString(exportString: IExportString){
      this.idbService.getBuildFromExportString$(exportString).pipe(
        takeUntil(this.destroy$)).subscribe((res)=>{
          let build: IBuild = {
            id: -1,
            buildName: exportString.buildName,
            status:'SAVED',
            stepNumber: 4,
            selectedCharacter: res[0],
            selectedWeapon: res[1],
            selectedRunes: res[2],
            selectedSkills: res[3],
          }
        
          
          this.idbService.getTableLength(this.idbService.db.builds).then((tableLengthRes)=>{
          build.id = tableLengthRes+1
          this.idbService.addItem$(this.idbService.db.builds,build).pipe(take(1)).subscribe((res)=>{
            this.allSavedBuilds.push(build);
            this.buildService._setAllSavedBuilds(this.allSavedBuilds)
          })
         
         
          
         
          
          })
        }) 
  }


  
}
