import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilContainerComponent } from './build-container.component';

describe('BuilContainerComponent', () => {
  let component: BuilContainerComponent;
  let fixture: ComponentFixture<BuilContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
