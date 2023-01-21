import { Component, OnInit } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  createHighlighted: boolean = false;
  skillsHighlighted: boolean = false;

  constructor() { }

  setHighligtedImage(type:string){
    const createBtn = (<HTMLInputElement | null>document.getElementById("create"));
    const skillsBtn = (<HTMLInputElement | null>document.getElementById("skills"));
    switch (type) {
      case 'create':
        if(this.skillsHighlighted === true && skillsBtn !== null){
          this.skillsHighlighted = false ;
          skillsBtn.src ="assets/skills_btn.png"
        }  
        if(this.createHighlighted === false && createBtn !== null){
          createBtn.src = 'assets/create_btn_highlighted.png'
          this.createHighlighted = !this.createHighlighted;
        }else if(createBtn !== null && this.skillsHighlighted === true){
          createBtn.src ="assets/create_btn.png"
          this.createHighlighted = !this.createHighlighted;
        }
        
          
        break;
        case 'skills':
          if(this.createHighlighted === true && createBtn !== null){
            this.createHighlighted = false ;
            createBtn.src ="assets/create_btn.png"
          }  
          
        if(this.skillsHighlighted === false && skillsBtn !== null){
          skillsBtn.src = 'assets/skills_btn_highlighted.png'
          this.skillsHighlighted = !this.skillsHighlighted;
        }else if(skillsBtn !== null && this.createHighlighted === true){
          skillsBtn.src ="assets/skills_btn.png"
          this.skillsHighlighted = !this.skillsHighlighted;
        }
        
        break;
      
    }
  }

  ngOnInit(): void {
  }

}
