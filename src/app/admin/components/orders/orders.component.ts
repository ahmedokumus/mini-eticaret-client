import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/admin/models/product.service';

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
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    this.showSpinner(SpinnerType.SquareJellyBox);
    const create_product: Create_Product = new Create_Product();
    create_product.name;
    create_product.stock;
    create_product.price;

    this.productService.create(
      create_product,
      () => {
        this.hideSpinner(SpinnerType.SquareJellyBox);
        this.alertify.message(`${create_product.name} Başarıyla Eklenmiştir.`, {
          dismissOthers: false,
          messageType: MessageType.Success,
          position: Position.TopRight,
          delay: 2,
        });
        this.createdProduct.emit(create_product);
      },
      (errorMessage) => {
        this.hideSpinner(SpinnerType.SquareJellyBox);
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }
}

export class Create_Product {
  name: string = 'OrderÜrün';
  stock: number = 10;
  price: number = 10;
}
