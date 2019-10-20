import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { UiSwitchModule } from 'ngx-ui-switch';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


// Services
import { PrivilegeService } from './services/privilege.service';
import { CookieService } from 'ng2-cookies';
import { TokenUtil } from './utils/token.util';
import { AppStorage } from './services/for-storage/universal.inject';
import { CookieStorage } from './services/for-storage/browser.storage';
import { AuthService} from './services/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { HttpWrapper } from './services/http-wrapper';
import { RequestInterceptorService } from './services/http-wrapper/request.interceptor';


// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { KeywordRelevantJobsComponent } from './keyword-relevant-jobs/keyword-relevant-jobs.component';
import { OrganicKeywordsComponent } from './organic-keywords/organic-keywords.component';
import { OrganicSummaryDashboardComponent } from './organic-keywords/organic-summary-dashboard/organic-summary-dashboard.component';
import { OrganicRunHistoryComponent } from './organic-keywords/organic-run-history/organic-run-history.component';
import { AutoRunScheduleComponent } from './auto-run-schedule/auto-run-schedule.component';
import { ResultHeaderComponent } from './result-header/result-header.component';
import { OrganicJoblistComponent } from './organic-keywords/organic-joblist/organic-joblist.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MonitorJobsComponent } from './monitor-jobs/monitor-jobs.component';
import { AlertsComponent } from './alerts/alerts.component';
import { UpstartModalComponent } from './upstart-modal/upstart-modal.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingIndicatorComponent } from './loadingindicator/loadingindicator.component';
import { TopNotificationComponent } from './top-notification/top-notification.component';
import { SummaryDashboardComponent } from './summary-dashboard/summary-dashboard.component';
import { BarchartsComponent } from './barcharts/barcharts.component';
import { MapmonitorJobDetailsComponent } from './mapmonitor-job-details/mapmonitor-job-details.component';
import { MapmonitorLastRunJobDetailsComponent } from './mapmonitor-last-run-job-details/mapmonitor-last-run-job-details.component';
import { ResultHeaderDupComponent } from './result-header-dup/result-header-dup.component';
import { KeywordRelevanceDashboardComponent } from './keyword-relevant-jobs/keyword-relevance-dashboard/keyword-relevance-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapmonitorRunHistoryComponent } from './mapmonitor-run-history/mapmonitor-run-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NavbarComponent,
    ProfileComponent,
    KeywordRelevantJobsComponent,
    OrganicKeywordsComponent,
    OrganicSummaryDashboardComponent,
    OrganicRunHistoryComponent,
    AutoRunScheduleComponent,
    ResultHeaderComponent,
    OrganicJoblistComponent,
    JobDetailsComponent,
    MonitorJobsComponent,
    AlertsComponent,
    UpstartModalComponent,
    UserSettingsComponent,
    PaginationComponent,
    LoadingIndicatorComponent,
    TopNotificationComponent,
    SummaryDashboardComponent,
    BarchartsComponent,
    MapmonitorJobDetailsComponent,
    MapmonitorLastRunJobDetailsComponent,
    ResultHeaderDupComponent,
    KeywordRelevanceDashboardComponent,
    DashboardComponent,
    MapmonitorRunHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    ChartsModule,
    NgxPaginationModule,
    HttpClientModule,
    UiSwitchModule
  ],
  providers: [
    PrivilegeService,
    CookieService,
    AuthGuard,
    AuthService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    TokenUtil, HttpWrapper, { provide: AppStorage, useClass: CookieStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }
