import { ICharacter } from "../character/character";
import { IRune } from "../rune/rune";
import { IActiveSkill } from "../skill/skill";
import { IWeapon } from "../weapon/weapon";

/**
 *
 */


export interface IBuild{
    id: number,
    stepNumber: number,
    status: BuildStatus
    buildName?: string,
    selectedCharacter?: ICharacter,
    selectedWeapon?: IWeapon,
    selectedSkills?: IActiveSkill[],
    selectedRunes?: IRune[],
    icon?:string,
    

}
export type BuildStatus = 'INPRG' | 'SAVED'

export function generateBuild():IBuild{
    let build: IBuild = {id:0,stepNumber:0,buildName:'New Build',status:'INPRG'}
    return build;
}