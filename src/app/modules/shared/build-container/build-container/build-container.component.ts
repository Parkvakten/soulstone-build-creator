import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { generateExportStringFromBuild, IBuild } from 'src/app/resources/models/build/build';
import { BuildService } from 'src/app/resources/services/build/build.service';

@Component({
  selector: 'app-buil-container',
  templateUrl: './build-container.component.html',
  styleUrls: ['./build-container.component.css']
})
export class BuilContainerComponent implements OnInit {
  @Input() getBuilds: boolean = false;
  @Input() getInprgBuild:boolean = false;
  @Input() exportable: boolean = false;
  localStorageBuild: IBuild | null = null;
  constructor(private buildService:BuildService) {
    
    
  }
  ngOnInit(): void {
    
    }
  
    $getInProgressBuilds: Observable<IBuild[]> = this.buildService.getBuildsByStatus$('INPRG')
    .pipe(
      map((res)=>{
        console.log('res for get inprg build',res);
        return res;
      })
    
    )
    
    $getBuilds: Observable<IBuild[]> = this.buildService.getBuildsByStatus$('SAVED')
    .pipe(
      map((res)=>{
        console.log('res for get builds',res);
        return res
      })
    )
  

  navigateToBuild(build:IBuild){
    this.buildService._setNewCurrentBuild(build)
   }
   exportBuild(build: IBuild){
    if(this.exportable === true){
      let exportString = JSON.stringify(generateExportStringFromBuild(build));
      navigator.clipboard.writeText(exportString);
      alert('Buildstring copied to clipboard')

    }
   }
}
