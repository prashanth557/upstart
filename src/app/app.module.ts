import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { EllipsisModule } from 'ngx-ellipsis';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// Services
import { PrivilegeService } from './services/privilege.service';
import { CookieService } from 'ng2-cookies';
import { TokenUtil } from './utils/token.util';
import { AppStorage } from './services/for-storage/universal.inject';
import { CookieStorage } from './services/for-storage/browser.storage';
import { AuthService} from './services/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { BulkCrawlService } from './services/bulkcrawl.service';
import { HttpWrapper } from './services/http-wrapper';
import { RequestInterceptorService } from './services/http-wrapper/request.interceptor';
import { SellerCrawlService } from './services/sellercrawl.service';
import { ActivateOnAccessToken } from './guards/acess-token.guard';

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
import { JobDetailsComponent2 } from './job-details2/job-details2.component';
import { MonitorJobsComponent } from './monitor-jobs/monitor-jobs.component';
import { AlertsComponent } from './alerts/alerts.component';
import { UpstartModalComponent } from './upstart-modal/upstart-modal.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationComponent2 } from './pagination2/pagination2.component';
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
import { OrganicKeywordsSchedulesComponent } from './organic-keywords/organic-keywords-schedules/organic-keywords-schedules.component';
import { OrganicKeywordRunResultComponent } from './organic-keywords/organic-keyword-run-result/organic-keyword-run-result.component';
import { MapmonitorRunResultComponent } from './mapmonitor-run-result/mapmonitor-run-result.component';
import { BulkKeywordUploadComponent } from './bulk-keyword-upload/bulk-keyword-upload.component';
import { BulkCrawlResultComponent } from './bulk-keyword-upload/bulk-crawl-result/bulk-crawl-result.component';
import { BulkKeywordLastRunComponent } from './bulk-keyword-upload/bulk-crawl-lastrun/bulk-crawl-lastrun.component';
import { BulkKeywordRunHistoryComponent } from './bulk-keyword-upload/bulk-crawl-runhistory/bulk-crawl-runhistory.component';
import { BulkCrawlRunResultComponent } from './bulk-keyword-upload/bulk-crawl-run-result/bulk-crawl-run-result.component';
import { SellerCrawlComponent } from './seller-crawl/seller-crawl.component';
import { SellerCrawlLastrunComponent } from './seller-crawl/seller-crawl-lastrun/seller-crawl-lastrun.component';
import { SellerCrawlRunResultComponent } from './seller-crawl/seller-crawl-run-result/seller-crawl-run-result.component';
import { SellerCrawlRunhistoryComponent } from './seller-crawl/seller-crawl-runhistory/seller-crawl-runhistory.component';
import { SellerCrawlResultComponent } from './seller-crawl/seller-crawl-result/seller-crawl-result.component';
import { UsersComponent } from './user-settings/users/users.component';

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
    JobDetailsComponent2,
    MonitorJobsComponent,
    AlertsComponent,
    UpstartModalComponent,
    UserSettingsComponent,
    PaginationComponent,
    PaginationComponent2,
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
    OrganicKeywordsSchedulesComponent,
    OrganicKeywordRunResultComponent,
    MapmonitorRunResultComponent,
    BulkKeywordUploadComponent,
    BulkCrawlResultComponent,
    BulkKeywordLastRunComponent,
    BulkKeywordRunHistoryComponent,
    BulkCrawlRunResultComponent,
    SellerCrawlComponent,
    SellerCrawlLastrunComponent,
    SellerCrawlRunResultComponent,
    SellerCrawlRunhistoryComponent,
    SellerCrawlResultComponent,
    UsersComponent
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
    UiSwitchModule,
    NguiAutoCompleteModule,
    EllipsisModule,
    NgbModule
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule
  ],
  providers: [
    PrivilegeService,
    CookieService,
    AuthGuard,
    AuthService,
    BulkCrawlService,
    SellerCrawlService,
    DatePipe,
    ActivateOnAccessToken,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    TokenUtil, HttpWrapper, { provide: AppStorage, useClass: CookieStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }
