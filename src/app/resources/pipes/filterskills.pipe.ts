import { Pipe, PipeTransform } from '@angular/core';
import { IActiveSkill } from '../models/skill/skill';

@Pipe({
  name: 'filterskills'
})
export class FilterskillsPipe implements PipeTransform {

  transform(skills:IActiveSkill[] | null,filterTerm?: any): IActiveSkill[] {
    console.log('skills in filter',skills);
    console.log('filterTerm',filterTerm)
    if(filterTerm === '' && skills !== null){
      return skills
    }else{
      if(skills !== null){
        
        return skills.filter((skill)=>{
          return skill.activeSkill.title.toLowerCase().includes(filterTerm.toLowerCase())
        }) 
      }else{
        return []
      }
      
    }
  }

}

