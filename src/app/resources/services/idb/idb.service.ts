import { Injectable } from '@angular/core';
import { Table } from 'dexie';
import { defer, from, Observable } from 'rxjs';
import { IdbDatabase } from 'src/app/idbconfig';
import { ICharacter } from '../../models/character/character';
import { IRune } from '../../models/rune/rune';
import { IActiveSkill, IStatusEffect } from '../../models/skill/skill';
import { IWeapon } from '../../models/weapon/weapon';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  constructor() { }
  public db = IdbDatabase;

  populateSkills$(skills: IActiveSkill[]):Observable<boolean>{
    
    const obs$ = defer(()=> from(IdbDatabase.active_skills.bulkAdd(skills).then((res)=>{
      console.log('result i add',res);
      return true;
      
    }).catch(()=>{
      return false
    })))
    
    return obs$
  }
  populateWeapons$(weapons: IWeapon[]):Observable<boolean>{
    const obs$ = defer(()=> from(IdbDatabase.weapons.bulkAdd(weapons).then((res)=>{
      console.log('result i add på weapons------------------',res);
      return true;
      
    }).catch(()=>{
      return false
    })))
    
    return obs$
  }
  populateCharacters$(characters:ICharacter[]):Observable<boolean>{
    const obs$ = defer(()=> from(IdbDatabase.characters.bulkAdd(characters).then(()=>{
      return true;
      
    }).catch(()=>{
      return false
    })))
    
    return obs$
  }
  populateStatusEffects$(statusEffects:IStatusEffect[]):Observable<boolean>{
    const obs$ = defer(()=> from(IdbDatabase.status_effects.bulkAdd(statusEffects).then(()=>{
      return true;
      
    }).catch(()=>{
      return false
    })))
    
    return obs$
  }
  populateRunes$(runes: IRune[]):Observable<boolean>{
    const obs$ = defer(()=> from(IdbDatabase.runes.bulkAdd(runes).then(()=>{
      return true;
      
    }).catch(()=>{
      return false
    })))
    
    return obs$
  }

  getTableLength(table: Table): Observable<number>{
     const obs$ = defer(()=> from(table.count()))
    return obs$
  }

  getAllItems$<T>(table:Table): Observable<T[]>{
    const obs$ = from(table.toArray());
    //const obs$ = defer(() => from(table.toArray()))
    return obs$ as Observable<T[]>
  }


}
