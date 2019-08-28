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

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ForgotPasswordComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'myprofile', component: ProfileComponent },
  { path: 'keywordjoblist', component: KeywordRelevantJobsComponent},
  { path: 'keywordset', component: OrganicKeywordsComponent },
  { path: 'keywordresultdash', component: OrganicSummaryDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }


