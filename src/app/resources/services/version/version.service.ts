import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  versions: Versions[] = this.getVersionsFromLocalStorage();
  constructor() { }

  addVersion(version: Versions){
    let versionsObj: Versions[] = [];
    let storageVersions: string | null = localStorage.getItem('versions');
    if(storageVersions !== null){
      versionsObj = JSON.parse(storageVersions);
      versionsObj = versionsObj.filter((versionObj)=> {
        return versionObj.objectName !==version.objectName
      })
      versionsObj.push(version);
      localStorage.setItem('versions',JSON.stringify(versionsObj))
    }else{
      versionsObj.push(version)
      localStorage.setItem('versions',JSON.stringify(versionsObj))
    }
  }

  addVersions(stringifiedArray: string){
    let versions: string[] = [stringifiedArray]
    localStorage.setItem('versions',JSON.stringify(versions)) 
  }

  getVersionsFromLocalStorage(): Versions[]{
    let storageVersions: string | null = localStorage.getItem('versions');
    let versions: Versions[] = [];
    if(storageVersions !== null){
      
      versions = JSON.parse(storageVersions)
      versions.forEach((version,index)=> {
        versions[index] = JSON.parse(JSON.stringify(version)) as Versions;
      })
      return versions;
    }else{
      return [];
    }
    
  }

 public getVersionNumber(objectName:string):number | undefined{
    if(this.versions.length > 0){
      let index = this.versions.findIndex((item)=> {
        return item.objectName === objectName;
      })
      return index !== -1 ? this.versions[index].version : undefined;
    }else{
      return undefined
    }
  }


 public checkVersion(localStorageVersionNumber: number | undefined, newVersionNumber: Versions): Observable<boolean>{
    
    //Om versionen i json filen är undefined behöver vi lägga till den då den inte finns.
    //Vi laddar även om data
    if(localStorageVersionNumber){
      if(newVersionNumber.version > localStorageVersionNumber){
        return of(true)
      }else{
        return of(false);
      }
    }else{
      return of(true)
    }
    
    
  }
}

export type Versions = {
  version:number,
  objectName: string
}
