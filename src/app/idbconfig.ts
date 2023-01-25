// db.ts
import Dexie, { Table } from 'dexie';
import { IBuild } from './resources/models/build/build';
import { ICharacter } from './resources/models/character/character';
import { IRune } from './resources/models/rune/rune';
import { IActiveSkill, IStatusEffect } from './resources/models/skill/skill';
import { IWeapon } from './resources/models/weapon/weapon';


export class AppDB extends Dexie {
    characters!: Table<ICharacter>;
    weapons!: Table<IWeapon>;
    active_skills!: Table<IActiveSkill>;
    status_effects!: Table<IStatusEffect>;
    runes!: Table<IRune>;
    builds!: Table<IBuild>

  constructor() {
    super('SoulstoneBuildCreator');
    this.version(1).stores({
        characters: '++id',
        weapons: '++id',
        active_skills: '++id',
        status_effects: '++id,effectTitle',
        runes: '++id',
        builds: '++id'
    });
    //this.on('populate', () => this.populate());
  }

//   async populate() {
//     const todoListId = await db.todoLists.add({
//       title: 'To Do Today',
//     });
//     await db.todoItems.bulkAdd([
//       {
//         todoListId,
//         title: 'Feed the birds',
//       },
//       {
//         todoListId,
//         title: 'Watch a movie',
//       },
//       {
//         todoListId,
//         title: 'Have some sleep',
//       },
//     ]);
//   }
}

export const IdbDatabase = new AppDB();