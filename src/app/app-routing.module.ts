import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
// Keyword Relevane Components
import { KeywordRelevantJobsComponent } from './keyword-relevant-jobs/keyword-relevant-jobs.component';
import { KeywordRelevanceDashboardComponent } from './keyword-relevant-jobs/keyword-relevance-dashboard/keyword-relevance-dashboard.component';
// Organic Keyword Components
import { OrganicKeywordsComponent } from './organic-keywords/organic-keywords.component';
import { OrganicSummaryDashboardComponent } from './organic-keywords/organic-summary-dashboard/organic-summary-dashboard.component';
import { OrganicRunHistoryComponent } from './organic-keywords/organic-run-history/organic-run-history.component';
import { OrganicKeywordsSchedulesComponent } from './organic-keywords/organic-keywords-schedules/organic-keywords-schedules.component';
import { OrganicKeywordRunResultComponent } from './organic-keywords/organic-keyword-run-result/organic-keyword-run-result.component';
import { OrganicJoblistComponent } from './organic-keywords/organic-joblist/organic-joblist.component';
import { AutoRunScheduleComponent } from './auto-run-schedule/auto-run-schedule.component';
// Map Monitor jobs
import { MonitorJobsComponent } from './monitor-jobs/monitor-jobs.component';
import { MapmonitorJobDetailsComponent} from './mapmonitor-job-details/mapmonitor-job-details.component';
import { MapmonitorLastRunJobDetailsComponent } from './mapmonitor-last-run-job-details/mapmonitor-last-run-job-details.component';
import { MapmonitorRunHistoryComponent } from './mapmonitor-run-history/mapmonitor-run-history.component';
import { MapmonitorRunResultComponent } from './mapmonitor-run-result/mapmonitor-run-result.component';
// Alerts Tab
import { AlertsComponent } from './alerts/alerts.component';
// User Settings Tab
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthGuard } from './guards/auth-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: []},
  { path: 'reset-password', component: ForgotPasswordComponent},
  // { path: '', canActivate: [AuthGuard], children: [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuard] },
  // Routes related to Keyword Relevance Tab
  { path: 'keywordjoblist', component: KeywordRelevantJobsComponent, canActivate: [AuthGuard]},
  { path: 'keywordjoblist/:jobId', component: OrganicJoblistComponent, canActivate: [AuthGuard]},
  { path: 'keywordjoblist/:jobId/dashboard', component: KeywordRelevanceDashboardComponent, canActivate: [AuthGuard]},
  // Routes Related to Organic Keywords Tab
  { path: 'keywordset', component: OrganicKeywordsComponent, canActivate: [AuthGuard] },
  { path: 'keywordset/:jobId/dashboard', component: OrganicSummaryDashboardComponent, canActivate: [AuthGuard]},
  { path: 'keywordset/:jobId/runhistory', component: OrganicRunHistoryComponent, canActivate: [AuthGuard]},
  { path: 'keywordset/:jobId/runhistory/:runId', component: OrganicKeywordRunResultComponent, canActivate: [AuthGuard]},
  { path: 'keywordset/organicJobList', component: OrganicJoblistComponent, canActivate: [AuthGuard]},
  { path: 'schedulesList', component: AutoRunScheduleComponent, canActivate: [AuthGuard]},
  // Routes Related to Map Monitor Jobs
  { path: 'mapjobslist', component: MonitorJobsComponent, canActivate: [AuthGuard]},
  { path: 'mapjobslist/:jobId', component: MapmonitorJobDetailsComponent, canActivate: [AuthGuard]},
  { path: 'mapjobslist/:jobId/lastrun', component: MapmonitorLastRunJobDetailsComponent, canActivate: [AuthGuard]},
  { path: 'mapjobslist/:jobId/runhistory', component: MapmonitorRunHistoryComponent, canActivate: [AuthGuard]},
  { path: 'mapjobslist/:jobId/runhistory/:runId', component: MapmonitorRunResultComponent, canActivate: [AuthGuard]},
  // Routes related to alerts
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard]},
  // Routes related to settings
  { path: 'users', component: UserSettingsComponent, canActivate: [AuthGuard]}
  // ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }


