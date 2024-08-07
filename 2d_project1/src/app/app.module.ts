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
import { FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './pop-up-windows/forget-password/forget-password.component';
import { NewProjectComponent } from './pop-up-windows/new-project/new-project.component';
import { DeleteProjectComponent } from './pop-up-windows/delete-project/delete-project.component';
import { UploadTleComponent } from './pop-up-windows/upload-tle/upload-tle.component';
import { ViewResultComponent } from './pop-up-windows/view-result/view-result.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkerService } from './services/marker.service';
import { PopUpGroundStationService } from './services/popupGroundStation.service';
import { PopUpSatelliteService } from './services/popupSatellite.service';
import { TestComponent } from './test/test.component';
import { ReportInfoComponent } from './report-info/report-info.component';
import { Map2dComponent } from './maps/map2d/map2d.component';
import { Map3dComponent } from './maps/map3d/map3d.component';
import { MapTreeComponent } from './maps/map-tree/map-tree.component';

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
    ProjectListComponent,
    ForgetPasswordComponent,
    NewProjectComponent,
    DeleteProjectComponent,
    UploadTleComponent,
    ViewResultComponent,
    TestComponent,
    ReportInfoComponent,
    Map2dComponent,
    Map3dComponent,
    MapTreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LeafletModule,
  ],
  providers: [MarkerService, PopUpGroundStationService, PopUpSatelliteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
