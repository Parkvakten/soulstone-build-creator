import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { type } from 'os';
import { map, Observable, BehaviorSubject, mergeMap, switchMap, of, takeUntil, take, shareReplay, concatMap, forkJoin, Subject } from 'rxjs';
import { BuildStatus, generateBuild, generateExportStringFromBuild, IBuild, IExportString } from '../../models/build/build';
import { IdbService } from '../idb/idb.service';

@Injectable({
  providedIn: 'root'
})
export class BuildService implements OnDestroy {
  

  private shouldUpdateBuild: boolean = false;
  private buildIdFromParams!: number;

  private destroy$: Subject<boolean> = new Subject<boolean>();
 private _currentBuild: BehaviorSubject<IBuild| null> = new BehaviorSubject<IBuild | null>(null);
 private _allSavedBuilds: BehaviorSubject<IBuild[]> = new BehaviorSubject<IBuild[]>([]);

  public readonly currentBuild$: Observable<IBuild| null> = this._currentBuild
  .asObservable()
  .pipe(
    map((build)=>{
      if(this.shouldUpdateBuild === true && build !== null){
        this.shouldUpdateBuild = false;
      return this.updateBuild$(build)
      }else{
        return this._currentBuild.getValue();
      }
              
    })
  )
  public readonly allSavedBuilds$: Observable<IBuild[]> = this._allSavedBuilds.asObservable().pipe(map((builds)=>{
    return builds;
  }))



  constructor(private idbService: IdbService,private router:Router,private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params)=>{
      this.buildIdFromParams = params['buildId'];
      this.getBuildFromParams()
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  getBuildFromParams() {
    if(this.buildIdFromParams !== undefined){
      this.getBuild$(Number(this.buildIdFromParams)).pipe(take(1)).subscribe((res)=>{
        if(res !== undefined){
          this._setNewCurrentBuild(res)
        }
      })
      
    }else{
      this._setNewCurrentBuild(null)
    }
    
  }
  _setNewCurrentBuild(build: IBuild|null){
    
    
    this.shouldUpdateBuild = false;
    this._currentBuild.next(build);
    if(build !== null){
      this.navigateToCurrentbuild(build)
    }
  }

  navigateToCurrentbuild(build: IBuild){
    let route: any = this.router.url.includes('/create') ? [] : build !== null ? ['/create'] : [];
    this.router.navigate(route,{
      relativeTo:this.route,
      queryParams: build !== null ? {'buildId':build.id} : null,
      queryParamsHandling: 'merge',
      replaceUrl:true
    })
  }

  _updateBuild(build:IBuild){
    this.shouldUpdateBuild = true;
    this._currentBuild.next(build)
  }

  _setAllSavedBuilds(builds:IBuild[]){
    this._allSavedBuilds.next(builds);
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
