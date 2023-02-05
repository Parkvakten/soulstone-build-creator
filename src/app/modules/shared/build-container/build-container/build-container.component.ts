import { Component, Input, OnInit } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { BuildService } from 'src/app/resources/services/build/build.service';

@Component({
  selector: 'app-buil-container',
  templateUrl: './build-container.component.html',
  styleUrls: ['./build-container.component.css']
})
export class BuilContainerComponent implements OnInit {

  @Input() builds:IBuild[]| null = []
  @Input() build:IBuild | null = null;
  localStorageBuild: IBuild | null = null;
  constructor(private buildService:BuildService) {
    
    
  }
  ngOnInit(): void {
    
    }
  

  

  navigateToBuild(build:IBuild){
    this.buildService._setNewCurrentBuild(build)
   }
}
