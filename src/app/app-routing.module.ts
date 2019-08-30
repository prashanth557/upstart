import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { KeywordRelevantJobsComponent } from './keyword-relevant-jobs/keyword-relevant-jobs.component';
import { OrganicKeywordsComponent } from './organic-keywords/organic-keywords.component';
import { OrganicSummaryDashboardComponent } from './organic-keywords/organic-summary-dashboard/organic-summary-dashboard.component';
import { OrganicRunHistoryComponent } from './organic-keywords/organic-run-history/organic-run-history.component';
import { AutoRunScheduleComponent } from './auto-run-schedule/auto-run-schedule.component';
import { OrganicJoblistComponent } from './organic-keywords/organic-joblist/organic-joblist.component';
import { MonitorJobsComponent } from './monitor-jobs/monitor-jobs.component';
import { AlertsComponent } from './alerts/alerts.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ForgotPasswordComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'myprofile', component: ProfileComponent },
  { path: 'keywordjoblist', component: KeywordRelevantJobsComponent},
  { path: 'keywordset', component: OrganicKeywordsComponent },
  { path: 'keywordresultdash', component: OrganicSummaryDashboardComponent},
  { path: 'organicRunHistory', component: OrganicRunHistoryComponent},
  { path: 'schedulesList', component: AutoRunScheduleComponent},
  { path: 'organicJobList', component: OrganicJoblistComponent},
  { path: 'mapjobslist', component: MonitorJobsComponent},
  { path: 'alerts', component: AlertsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }


