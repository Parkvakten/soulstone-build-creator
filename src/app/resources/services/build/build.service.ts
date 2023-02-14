import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { type } from 'os';
import { map, Observable, BehaviorSubject, mergeMap, switchMap, of, takeUntil, take, shareReplay, concatMap, forkJoin } from 'rxjs';
import { BuildStatus, generateBuild, generateExportStringFromBuild, IBuild, IExportString } from '../../models/build/build';
import { IdbService } from '../idb/idb.service';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  

  private shouldUpdateBuild: boolean = false;
  private buildIdFromParams!: number;
 private _currentBuild: BehaviorSubject<IBuild| null> = new BehaviorSubject<IBuild | null>(null);

  public readonly currentBuild$: Observable<IBuild| null> = this._currentBuild
  .asObservable()
  .pipe(
    map((build)=>{
      if(this.shouldUpdateBuild === true && build !== null){
        console.log('got update',build)
        this.shouldUpdateBuild = false;
      return this.updateBuild$(build)
      }else{
        return this._currentBuild.getValue();
      }
              
    })
  )



  constructor(private idbService: IdbService,private router:Router,private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params)=>{
      this.buildIdFromParams = params['buildId'];
      console.log('from params',this.buildIdFromParams)
      this.getBuildFromParams()
    })

  }


  getBuildFromParams() {
    if(this.buildIdFromParams !== undefined){
      this.getBuild$(Number(this.buildIdFromParams)).pipe(take(1)).subscribe((res)=>{
        if(res !== undefined){
          console.log('build from params',res)
          this._setNewCurrentBuild(res)
        }
      })
      
    }else{
      this._setNewCurrentBuild(null)
    }
    
  }
  _setNewCurrentBuild(build: IBuild|null){
    this.shouldUpdateBuild = false;
    this.router.navigate([],{
      relativeTo: this.route,
      queryParams: build !== null ? {'buildId':build.id} : null,
      queryParamsHandling: 'merge',
      replaceUrl:true
    })
    this._currentBuild.next(build)
  }

  _updateBuild(build:IBuild){
    this.shouldUpdateBuild = true;
    this._currentBuild.next(build)
  }

  nextStep(build: IBuild){
    build.stepNumber = build.stepNumber +1;
    this._currentBuild.next(build)
  }

  previousStep(build: IBuild){
    build.stepNumber = build.stepNumber -1;
    this._currentBuild.next(build)
  }

 private updateBuild$(build: IBuild):IBuild|null{
   this.idbService.updateItem$<IBuild>(this.idbService.db.builds,build.id,build)
    .pipe(take(1)).subscribe()
    
    return this._currentBuild.getValue()
  }

  getBuild$(buildId: number):Observable<IBuild> {
    return this.idbService.getItemByIndex$<IBuild>(this.idbService.db.builds,'id',buildId).pipe(map((build)=>{
      return build;
    }))
  }

  getBuildByStatus$(status: BuildStatus): Observable<IBuild>{
    return this.idbService.getItemByIndex$<IBuild>(this.idbService.db.builds,'status',status).pipe(map((build)=> {
      return build;
    }))
  }

  getBuildsByStatus$(status: BuildStatus): Observable<IBuild[]>{
    return this.idbService.getItemsByIndex$<IBuild>(this.idbService.db.builds,{'status':status}).pipe(map((build)=> {
      return build;
    }))
  }

  getAllBuilds$():Observable<IBuild[]>{
    return this.idbService.getAllItems$<IBuild>(this.idbService.db.builds).pipe(map((allBuilds)=>{
      return allBuilds
    }))
  }

  deleteBuild$(buildId: number):Observable<any>{
    return this.idbService.deleteItem$(buildId,this.idbService.db.builds).pipe(map((res)=>{
      return res;
    }))
  }


}
