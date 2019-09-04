import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
// Services
import { PrivilegeService } from './services/privilege.service';
import { CookieService } from 'ng2-cookies';
import { TokenUtil } from './utils/token.util';
import { AppStorage } from './services/for-storage/universal.inject';
import { CookieStorage } from './services/for-storage/browser.storage';
import { AuthService} from './services/auth.service';
import { AuthGuard } from './guards/auth-guard.service';


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
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ChartsModule,
    NgxPaginationModule
  ],
  providers: [
    PrivilegeService,
    CookieService,
    AuthGuard,
    AuthService,
    TokenUtil, { provide: AppStorage, useClass: CookieStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }
