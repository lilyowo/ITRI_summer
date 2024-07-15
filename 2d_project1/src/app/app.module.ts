import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ReportComponent } from './report/report.component';
import { ReportTitleComponent } from './report-title/report-title.component';
import { ReportContentComponent } from './report-content/report-content.component';
import { HttpClientModule } from '@angular/common/http';
import { CentralCanvasComponent } from './central-canvas/central-canvas.component';
import { LeftToolsComponent } from './left-tools/left-tools.component';
import { RightSettingsComponent } from './right-settings/right-settings.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormatTabsComponent } from './format-tabs/format-tabs.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
// 確保這裡導入了 HttpClientModule



@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    NavBarComponent,
    LoginComponent,
    ReportComponent,
    ProjectlistComponent,
    ReportTitleComponent,
    ReportContentComponent,
    CentralCanvasComponent,
    LeftToolsComponent,
    RightSettingsComponent,
    ProgressBarComponent,
    FormatTabsComponent,
    SettingsMenuComponent
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
