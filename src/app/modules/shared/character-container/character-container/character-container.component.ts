import { Component, Input } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { ICharacter } from 'src/app/resources/models/character/character';

@Component({
  selector: 'app-character-container',
  templateUrl: './character-container.component.html',
  styleUrls: ['./character-container.component.css']
})

export class CharacterContainerComponent {


  setSelectedIndex(index: number){
    this.selectedIndex = index
  }
  @Input() currentBuild!: IBuild;
  @Input() character!: ICharacter;
  @Input() stepNumber!: number;
  @Input() selected: boolean = false
  selectedIndex: number = -1
}
