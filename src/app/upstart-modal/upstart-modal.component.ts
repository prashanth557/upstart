import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upstart-modal',
  templateUrl: './upstart-modal.component.html',
  styleUrls: ['./upstart-modal.component.scss']
})
export class UpstartModalComponent implements OnInit {

  @Input() modalTitle: String;
  constructor() { }

  ngOnInit() {
  }

}
