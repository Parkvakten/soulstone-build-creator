import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { BuildService } from 'src/app/resources/services/build/build.service';

@Component({
  selector: 'app-selector-base',
  templateUrl: './selector-base.component.html',
  styleUrls: ['./selector-base.component.css']
})
export class SelectorBaseComponent {

  /**
   *
   */

  @Input() currentBuild!: IBuild;
  @Input() selectItem!: ISelectItem; 
  @Input() buttonText: string = '';
  @Input() selected: boolean = false;
  @Input() selectedIndex: number = -1;
  constructor(private buildService:BuildService) {

  }

  saveItem(selectItem: ISelectItem){
    debugger;
      (this.currentBuild as any)[selectItem.objectKey] = selectItem.item;
      console.log(selectItem);
      this.buildService._updateBuild(this.currentBuild);
      this.buildService.nextStep(this.currentBuild)
      

  }

  nextStep(){
  return this.buildService.nextStep(this.currentBuild);
}

previousStep(){
  return this.buildService.previousStep(this.currentBuild);
}


}


export interface ISelectItem {
  objectKey: string;
  item: any
}