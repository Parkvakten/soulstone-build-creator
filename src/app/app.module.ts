import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './resources/page-header/page-header.component';
import { StartPageComponent } from './modules/start-page/start-page.component';
import { CreateBuildComponent } from './modules/create-build/create-build.component';
import { ViewSkillsComponent } from './modules/view-skills/view-skills.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    StartPageComponent,
    CreateBuildComponent,
    ViewSkillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
