import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import $ from "jquery";
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {

  createHighlighted: boolean = false;
  skillsHighlighted: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart){
        console.log(event.url,event.url === '/create',event.url === '/view');
        if(event.url === '/create'){
          this.createHighlighted = true;
          this.skillsHighlighted = false;
        }else if(event.url === '/view'){
          this.createHighlighted = false;
          this.skillsHighlighted = true;
        }else{
          this.createHighlighted = false;
          this.skillsHighlighted = false;
        }
      }
    })
   }

}
