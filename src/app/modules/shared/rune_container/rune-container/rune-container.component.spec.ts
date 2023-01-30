import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuneContainerComponent } from './rune-container.component';

describe('RuneContainerComponent', () => {
  let component: RuneContainerComponent;
  let fixture: ComponentFixture<RuneContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuneContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuneContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
