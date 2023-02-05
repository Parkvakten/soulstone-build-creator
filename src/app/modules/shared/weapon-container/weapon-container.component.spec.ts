import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponContainerComponent } from './weapon-container.component';

describe('WeaponContainerComponent', () => {
  let component: WeaponContainerComponent;
  let fixture: ComponentFixture<WeaponContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
