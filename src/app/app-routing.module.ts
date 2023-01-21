import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBuildComponent } from './modules/create-build/create-build.component';
import { StartPageComponent } from './modules/start-page/start-page.component';
import { ViewSkillsComponent } from './modules/view-skills/view-skills.component';

const routes: Routes = [
  {path:'', component: StartPageComponent},
  {path:'create', component: CreateBuildComponent},
  {path:'view',component:ViewSkillsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
