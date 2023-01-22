export interface IActiveSkill {
   activeSkill: ISkill,
   statusEffect?: StatusEffectTitle[],
   cooldown:number
   skillType: SkillType[],
   id: number,
}

export interface IPassiveSkill {
   passiveSkill: ISkill,
   stackSize: number,
   affectedTypes: SkillType[]

}

interface ISkill{
    icon: any,
    title:string,
    description: string,
    
}

export interface IStatusEffect {
   effectTitle: StatusEffectTitle,
   effectDescription:string,
   effectDetail:string,
   effectHighligtColor:string,
   id: number
}

export type StatusEffectTitle = "Doom" | "Fragility" | "Slow" | "Burn" | "Poison" | "Cursed" | "Melting" | "Bleed" | "Hemorrhage" | "Rot" | "Weakness" | "Brittle" | "Paralysis" | "Stun" | "Dazed" | "Disoriented" | "Exposed" | "Vulnerable" | "Distracted" | "Confused" | "Wound" | "Negative Effect"

type SkillType = 
   'Arcane' | 'Fire' | 'Chaos' | 'Physical' | 'Ice' | 'Electric' | 'Nature' | 'Shadow' | 'Holy' | 
'Magical' | 'Swing' | 'Frontal' | 'Burst' | 'Area' | 'Missile' | 'Projectile' | 'Bomb' | 'Thrust' | 
'Empowering' | 'Lasting' | 'Summon' | 'Aura' | 'Blast' | 'Slam' | 'Seasonal'


// {"activeSkill": {
//     "icon": "",
//     "title":"",
//     "description": "",
//     "highlightedText":"",
//     "skillId": 0
// },
// "skillType":[]}



