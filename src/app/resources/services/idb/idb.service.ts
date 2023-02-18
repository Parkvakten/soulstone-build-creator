import { Injectable } from '@angular/core';
import { Table } from 'dexie';
import { concatMap, defer, forkJoin, from, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { IdbDatabase } from 'src/app/idbconfig';
import { IBuild, IExportString } from '../../models/build/build';
import { ICharacter } from '../../models/character/character';
import { IdbIndex } from '../../models/idb/idb';
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
      return true;
    }).catch(()=>{
      return false;
    }))
    return obs$;
  }

  populateSkills$(skills: IActiveSkill[]):Observable<boolean>{
    
    const obs$ = defer(()=> from(IdbDatabase.active_skills.bulkAdd(skills).then((res)=>{
      return true;
      
    }).catch(()=>{
      return false
    })))
    
    return obs$
  }
  populateWeapons$(weapons: IWeapon[]):Observable<boolean>{
    const obs$ = defer(()=> from(IdbDatabase.weapons.bulkAdd(weapons).then((res)=>{
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
      return res;
    }))
    return obs$
  }

  getItemsByIndex$<T>(table: Table,indexArr: IdbIndex):Observable<T[]>{
    const obs$ = from(table.where({...indexArr}).toArray());
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

  test():Observable<IActiveSkill[]>{
    //  this.db.active_skills.where('id').equals([1,2,3,4,]).toArray();
    const getSkills$ = from(this.db.active_skills.where('id').anyOf([5, 8, 11, 12, 10, 14]).toArray());
    return getSkills$;
  }

  getBuildFromExportString$(build: IExportString):Observable<any>{
    const getCharacter$ = from(this.db.characters.where('id').equals(build.selectedCharacterId).toArray());
    const getWeapon$ = from(this.db.weapons.where('id').equals(build.selectedWeaponId).toArray());
    const getRunes$ = from(this.db.runes.where('id').anyOf(build.selectedRunesId).toArray());
    const getSkills$ = from(this.db.active_skills.where('id').anyOf(build.selectedSkillsId).toArray());
    return forkJoin([getCharacter$, getWeapon$, getRunes$,getSkills$]).pipe(map((res)=>{
      return res.map((r)=>{
        if('characterType' in r[0] || 'class' in r[0]){
          return r[0]
        }else{
          return r;
        }
        
      })
    }))
    
  }


}
