import { Component, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-top-notification',
  styleUrls: ['./top-notification.component.scss'],
  templateUrl: './top-notification.component.html'
})
export class TopNotificationComponent {

  /*message and isSuccess values are assigned by parent component,
  isSuccess variable is used to display  different icons based on  success or error scenario */
  @Input() message: string;
  @Input() isSuccess: boolean;
  // showNotificationScreen is used to show or close notification
  @Input() showNotification: boolean = false;
  displayNotification(showNotification, isSuccess, message) {
    if (showNotification) {
      $('app-wrapper').addClass('show-notification');
      $('sidebar-brand').addClass('show-notification');
    } else {
      $('app-wrapper').removeClass('show-notification');
      $('sidebar-brand').removeClass('show-notification');
    }
    this.showNotification = showNotification;
    this.isSuccess = isSuccess;
    this.message = message;
  }

  onClickCancel() {
    this.showNotification = false;
    $('main').removeClass('show-notification');
  }
}
