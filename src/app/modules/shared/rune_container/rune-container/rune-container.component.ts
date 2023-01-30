import { Component, Input } from '@angular/core';
import { IBuild } from 'src/app/resources/models/build/build';
import { IRune } from 'src/app/resources/models/rune/rune';

@Component({
  selector: 'app-rune-container',
  templateUrl: './rune-container.component.html',
  styleUrls: ['./rune-container.component.css']
})
export class RuneContainerComponent {

  @Input() rune!: IRune;
  @Input() currentBuild!: IBuild;
  @Input() selected: boolean = false;
}
