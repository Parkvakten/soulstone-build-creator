import { Observable } from "rxjs";
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
}

export interface IExportString {
    buildName: string,
    selectedCharacterId: number,
    selectedWeaponId:number,
    selectedRunesId: number[],
    selectedSkillsId: number[],
    buildIcon:string
    
}

export type BuildStatus = 'INPRG' | 'SAVED';

export function generateExportStringFromBuild(build: IBuild): IExportString | null{
    if(build.buildName && build.selectedCharacter && build.selectedRunes && build.selectedSkills && build.selectedWeapon){
        let runeIds: number[] = [];
        build.selectedRunes.forEach((rune)=>{
            runeIds.push(rune.id)
        });
        let skillIds: number[] = [];
        build.selectedSkills.forEach((skill)=>{
            skillIds.push(skill.id);
        })

        let exportString : IExportString = {buildName:build.buildName,
        selectedCharacterId: build.selectedCharacter.id,
        selectedWeaponId: build.selectedWeapon.id,
        selectedRunesId: runeIds,
        selectedSkillsId: skillIds,
        buildIcon: build.selectedCharacter.icon}
        return exportString
    }else{
        return null
    }
    


}


export function generateBuild():IBuild{
    let build: IBuild = {id:0,stepNumber:0,buildName:'New Build',status:'INPRG'}
    return build;
}