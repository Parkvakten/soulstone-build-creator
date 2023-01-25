import { IActionBar } from "../action-bar/action-bar";
import { IRune } from "../rune/rune";
import { IStat } from "../stat/stat";
import { IWeapon } from "../weapon/weapon";

export interface ICharacter {
    characterType: CharacterType
    weapons: IWeapon[],
    stats: IStat[]
    //runicPower: number,
    
   //actionBar: IActionBar,
    

}

export type CharacterType = [
    'The Barbarian',
    'The Pyromancer',
    'The Hound Master',
    'The Spellblade',
    'The Arcane Weaver',
    'The Sentinel',
    'The Paladin',
    'The Chaoswalker',
    'The Beastmaster',
    'The Assassin',
    'The Elementalis',
    'The Legionnaire',
    'The Necromancer',
    'The Death Knight']
