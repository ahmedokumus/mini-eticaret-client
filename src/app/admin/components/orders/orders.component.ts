import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  constructor(
    spinner: NgxSpinnerService,
    private htppClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    this.htppClientService
      .post(
        {
          controller: 'Product',
        },
        {
          name: 'Order',
          stock: 10,
          price: 10,
        }
      )
      .subscribe();
  }
}
