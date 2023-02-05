import { CharacterType } from "../character/character";
import { IStat } from "../stat/stat";

export interface IWeapon {
    icon: any,
    stats:IStat[],
    class:CharacterType,
    name: string,
    id:number
}



