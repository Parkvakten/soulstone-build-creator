import { Component, Input } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { IWeapon } from 'src/app/resources/models/weapon/weapon';

@Component({
  selector: 'app-weapon-container',
  templateUrl: './weapon-container.component.html',
  styleUrls: ['./weapon-container.component.css']
})
export class WeaponContainerComponent {

  @Input() weapon!: IWeapon;
  @Input() currentBuild!: IBuild;
  @Input() selected: boolean = false;
  selectedIndex: number = -1


  setSelectedIndex(index: number){
    this.selectedIndex = index
  }
 formatStatText(type:any,index:number){
    let element = document.getElementById(this.getId(type,index));
    let str = document.getElementById(this.getId(type,index))?.innerHTML; 
    if(str !== undefined && str !== '' && !str.includes('<')){
      
      let substring:any = str.match(/([+-^%]+)/g)
      console.log('str',str,'substring',substring)
      if(substring !== null){
        
        let color = str.includes('+')? 'var(--positive-color)' : 'var(--negative-color)'
        console.log('color',color)
      let res = str.replace(substring, "<span style='color:"+color+"'>"+substring+"</span>");
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
