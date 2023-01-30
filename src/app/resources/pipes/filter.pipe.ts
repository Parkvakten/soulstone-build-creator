import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class Filter implements PipeTransform {

  transform<T>(object: T[] | null, filterTerm?: any, firstFilterKey?:any,secondFilterKey?:any): T[] {
    if(filterTerm === '' && object !== null){
      return object
    }else{
      if(object !== null){
        return object.filter((obj)=>{
          if(firstFilterKey){
            if(secondFilterKey){
              return (obj as any)[firstFilterKey][secondFilterKey].toLowerCase().includes(filterTerm.toLowerCase());
            }else{
              return (obj as any)[firstFilterKey].toLowerCase().includes(filterTerm.toLowerCase());
            }
            
          }
          // else{
            
          //   // return rune.title.toLowerCase().includes(filterTerm.toLowerCase())
          // }
          
          
        }) 
      }else{
        return []
      }
      
    }
  }

}
