import { Component, Input, OnInit } from '@angular/core';
import { IBuild } from '../models/build/build';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css']
})
export class PageFooterComponent implements OnInit {

  @Input() currentBuild: IBuild | null = null;

  constructor() {
    console.log('currentbuild',this.currentBuild)
   }

  ngOnInit(): void {
  }

}
