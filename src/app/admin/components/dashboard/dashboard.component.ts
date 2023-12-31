import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent {
  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService) {
    super(spinner);
    // this.showSpinner(SpinnerType.SquareJellyBox);
  }

  m() {
    this.alertify.message('Merhaba', {
      messageType: MessageType.Success,
    });
  }

  d() {
    this.alertify.dismissAll();
  }
}
