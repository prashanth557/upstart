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
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthGuard } from './guards/auth-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'reset-password', component: ForgotPasswordComponent},
  // { path: '', canActivate: [AuthGuard], children: [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'keywordjoblist', component: KeywordRelevantJobsComponent, canActivate: [AuthGuard]},
  { path: 'keywordset', component: OrganicKeywordsComponent, canActivate: [AuthGuard] },
  { path: 'keywordset/keywordresultdash', component: OrganicSummaryDashboardComponent, canActivate: [AuthGuard]},
  { path: 'keywordset/organicRunHistory', component: OrganicRunHistoryComponent, canActivate: [AuthGuard]},
  { path: 'schedulesList', component: AutoRunScheduleComponent, canActivate: [AuthGuard]},
  { path: 'keywordset/organicJobList', component: OrganicJoblistComponent, canActivate: [AuthGuard]},
  { path: 'mapjobslist', component: MonitorJobsComponent, canActivate: [AuthGuard]},
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard]}
  // ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }


