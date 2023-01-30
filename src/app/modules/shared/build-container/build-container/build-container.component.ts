import { Component, Input } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { BuildService } from 'src/app/resources/services/build/build.service';

@Component({
  selector: 'app-buil-container',
  templateUrl: './build-container.component.html',
  styleUrls: ['./build-container.component.css']
})
export class BuilContainerComponent {

  
  constructor(private buildService:BuildService) {
    
    
  }
  @Input() builds:IBuild[]| null = []

  navigateToBuild(build:IBuild){
    this.buildService._setNewCurrentBuild(build)
   }
}
