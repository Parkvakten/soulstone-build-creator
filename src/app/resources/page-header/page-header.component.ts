import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {  Subject, takeUntil } from 'rxjs';
import { BuildService } from '../services/build/build.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnDestroy {

  createHighlighted: boolean = false;
  skillsHighlighted: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private buildService:BuildService) {
  this.router.events.pipe(
    takeUntil(this.destroy$))
    .subscribe((event)=>{
      if(event instanceof NavigationStart){
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

   navigateHome(){
      this.buildService._setNewCurrentBuild(null);
    this.router.navigate(['/'],{
      queryParams:{'buildId':null},
      queryParamsHandling: 'merge',
      replaceUrl:true
    })
   }
   ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
