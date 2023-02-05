import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debug } from 'console';
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
  @Input() multiple: boolean = true;
  constructor(private buildService:BuildService) {

  }



  saveItem(selectItem: ISelectItem){
    switch (selectItem.objectKey) {
      case 'selectedSkills':
        this.currentBuild.selectedSkills === undefined ?
         this.currentBuild.selectedSkills = [selectItem.item] :
         this.currentBuild.selectedSkills.push(selectItem.item);
        this.buildService._updateBuild(this.currentBuild);
        if(this.currentBuild.selectedSkills !== undefined && this.currentBuild.selectedSkills.length === 6) {
          this.buildService.nextStep(this.currentBuild)
        }
        break;
        case 'selectedRunes':
          console.log(this.currentBuild.selectedRunes)
          this.currentBuild.selectedRunes === undefined ?
          this.currentBuild.selectedRunes = [selectItem.item] :
          this.currentBuild.selectedRunes.push(selectItem.item);
          this.buildService._updateBuild(this.currentBuild)

          console.log(this.currentBuild.selectedRunes.length)
          if(this.currentBuild.selectedRunes !== undefined && this.currentBuild.selectedRunes.length === 6){
              this.buildService.nextStep(this.currentBuild)
          }  
        break;
      default:
        (this.currentBuild as any)[selectItem.objectKey] = selectItem.item;
      console.log(selectItem);
      this.buildService._updateBuild(this.currentBuild);

        this.buildService.nextStep(this.currentBuild)
        break;
    }
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