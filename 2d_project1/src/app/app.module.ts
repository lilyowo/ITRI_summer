import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { ReportTitleComponent } from './report-title/report-title.component';
import { ReportContentComponent } from './report-content/report-content.component';
import { HttpClientModule } from '@angular/common/http';
import { CentralCanvasComponent } from './central-canvas/central-canvas.component';
import { LeftToolsComponent } from './left-tools/left-tools.component';
import { RightSettingsComponent } from './edit-setting-menu/right-settings/right-settings.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormatTabsComponent } from './format-tabs/format-tabs.component';
import { SettingsMenuComponent } from './edit-setting-menu/settings-menu/settings-menu.component';
import { SettingsService } from './services/settings.service';
import { OrbitComponent } from './edit-setting-menu/orbit/orbit.component';
import { SatelliteComponent } from './edit-setting-menu/satellite/satellite.component';
import { IslComponent } from './edit-setting-menu/isl/isl.component';
import { PayloadComponent } from './edit-setting-menu/payload/payload.component';
import { UtComponent } from './edit-setting-menu/ut/ut.component';
import { FtComponent } from './edit-setting-menu/ft/ft.component';
import { RuleRouteComponent } from './edit-setting-menu/rule-route/rule-route.component';
import { RuleSwitchComponent } from './edit-setting-menu/rule-switch/rule-switch.component';
import { RuleIslComponent } from './edit-setting-menu/rule-isl/rule-isl.component';
import { RuleRandomComponent } from './edit-setting-menu/rule-random/rule-random.component';
import { SimuSatelliteComponent } from './edit-setting-menu/simu-satellite/simu-satellite.component';
import { SimuFloorComponent } from './edit-setting-menu/simu-floor/simu-floor.component';
import { SimuRouteComponent } from './edit-setting-menu/simu-route/simu-route.component';
import { SimuSwitchComponent } from './edit-setting-menu/simu-switch/simu-switch.component';
import { ProjectListComponent } from './project-list/project-list.component';



@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    NavBarComponent,
    LoginComponent,
    ReportComponent,
    ReportTitleComponent,
    ReportContentComponent,
    CentralCanvasComponent,
    LeftToolsComponent,
    RightSettingsComponent,
    ProgressBarComponent,
    FormatTabsComponent,
    SettingsMenuComponent,
    OrbitComponent,
    SatelliteComponent,
    IslComponent,
    PayloadComponent,
    UtComponent,
    FtComponent,
    RuleRouteComponent,
    RuleSwitchComponent,
    RuleIslComponent,
    RuleRandomComponent,
    SimuSatelliteComponent,
    SimuFloorComponent,
    SimuRouteComponent,
    SimuSwitchComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
