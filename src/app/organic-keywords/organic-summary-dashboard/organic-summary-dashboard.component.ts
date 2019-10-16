import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CanvasJS from '../../canvasjs.min';
import { ChartsModule } from 'ng2-charts';
import { JobsService } from '../../services/jobs.service';


@Component({
  selector: 'app-organic-summary-dashboard',
  templateUrl: './organic-summary-dashboard.component.html',
  styleUrls: ['./organic-summary-dashboard.component.scss']
})
export class OrganicSummaryDashboardComponent implements OnInit {

  ngOnInit() {
  }

}
