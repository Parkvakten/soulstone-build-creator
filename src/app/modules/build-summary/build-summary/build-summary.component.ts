import { Component, Input } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';

@Component({
  selector: 'app-build-summary',
  templateUrl: './build-summary.component.html',
  styleUrls: ['./build-summary.component.css']
})
export class BuildSummaryComponent {

  @Input() build!: IBuild;

}
