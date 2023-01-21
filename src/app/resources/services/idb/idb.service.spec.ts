import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { IdbService } from './idb.service';
import { IActiveSkill, IStatusEffect } from '../../models/skill/skill';
import { IRune } from '../../models/rune/rune';
import { IWeapon } from '../../models/weapon/weapon';
import { take } from 'rxjs';

describe('IdbService', () => {
  let service: IdbService;
  let active_skills: IActiveSkill[] = require('../JSONS/active_skills.json');
  let runes: IRune[] = require('../JSONS/runes.json');
  let status_effects: IStatusEffect[] = require('../JSONS/status_effects.json');
  let weapons: IWeapon[]  = require('../JSONS/weapons.json');
  let testScheduler: TestScheduler
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbService);
    testScheduler = new TestScheduler((actual, expected) => {
      return expect(actual).toEqual(expected);
    });
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should populate character data', () => {
  //   expect(service.populateCharacters().subscribe()).toBeTrue();
  // })
  // it('should populate weapon data', () => {
  //   const y = service.populateWeapons(weapons);
  //   const expectedMarbles = '(a|)';
  //   const expectedValues = {
  //     a: true,
  //   };
  //   testScheduler.run(({ expectObservable }) => {
  //     expectObservable(y).toBe(
  //       expectedMarbles,
  //       expectedValues
  //     );
  //   });
  //   // expect(service.populateWeapons(weapons).subscribe((res)=> {
  //   //   return res;
  //   // })).toBeTrue();
  // })
  // it('should populate skills data', () => {
  //   const y = service.populateSkills(active_skills);
  //   const expectedMarbles = '(a|)';
  //   const expectedValues = {
  //     a: true,
  //   };
  //   testScheduler.run(({ expectObservable }) => {
  //     expectObservable(y).toBe(
  //       expectedMarbles,
  //       expectedValues
  //     );
  //   });
  // })
  // it('should populate status effects data', () => {
    
  //   const y = service.populateStatusEffects(status_effects);
  //   const expectedMarbles = '(a|)';
  //   const expectedValues = {
  //     a: true,
  //   };
  //   testScheduler.run(({ expectObservable }) => {
  //     expectObservable(y).toBe(
  //       expectedMarbles,
  //       expectedValues
  //     );
  //   });
  // })

  // it('should populate runes data', () => {
    
  //   const y = service.populateRunes(runes);
  //   const expectedMarbles = '(a|)';
  //   const expectedValues = {
  //     a: true,
  //   };
  //   testScheduler.run(({ expectObservable }) => {
  //     expectObservable(y.pipe((res)=> {
  //       return res;
  //     })).toBe(
  //       expectedMarbles,
  //       expectedValues
  //     );
  //   });
  // })


});
