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


  formatStatText(type:any,index:number){
    let element = document.getElementById(this.getId(type,index));
    let str = document.getElementById(this.getId(type,index))?.innerHTML; 
    if(str !== undefined && str !== ''){
      let substring:any = str.match('([+-^]+)')
      console.log('str',str,'substring',substring)
      debugger;
      if(substring !== null){
      let res = str.replace(substring, "<span style='color:red'>"+substring+"</span>");
      if(element){
        element.innerHTML = res;
      }}
      
    }
    
    
  }

  getId(type: any, index: number):string{
    let id: string = '';
    id = type + index;
    return id;
  }
}
