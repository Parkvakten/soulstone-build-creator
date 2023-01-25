import { Injectable } from '@angular/core';
import { Table } from 'dexie';
import { defer, from, map, mergeMap, Observable, of } from 'rxjs';
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

  addItem$(table: Table, object: any):Observable<boolean>{
    const obs$ = from(table.add(object).then((res)=>{
      console.log('res from add',res)
      return true;
    }).catch(()=>{
      return false;
    }))
    return obs$;
  }

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

  getTableLength(table:Table){
    return table.count()
  }


  getAllItems$<T>(table:Table): Observable<T[]>{
    const obs$ = from(table.toArray());
    //const obs$ = defer(() => from(table.toArray()))
    return obs$ as Observable<T[]>
  }

  getItemByIndex$<T>(table:Table,key:string, index: any):Observable<T>{
    const obs$ = from(table.where(key).equals(index).toArray()).pipe(mergeMap((res)=>{
      console.log('res',res)
      return res;
    }))
    return obs$
  }

  getItemsByIndex$<T>(table: Table, key:string,indexArr: string[]):Observable<T[]>{
    const obs$ = from(table.where(key).anyOf(indexArr).toArray());
    return obs$
  }

  deleteItem$(id:number,table:Table):Observable<any>{
    const obs$ = from(table.delete(id));
    return obs$;
  }

  updateItem$<T>(table:Table,id:number,changes:object):Observable<T>{
const obs$ = from(table.update(id,changes).then(()=>{
  return changes as any
}))
return obs$
  }


}
