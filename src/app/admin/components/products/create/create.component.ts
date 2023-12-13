import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/admin/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    // this.alertify.message('Ürün Başarıyla Eklenmiştir.', {
    //   dismissOthers: true,
    //   messageType: MessageType.Success,
    //   position: Position.TopRight,
    // });
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.SquareJellyBox);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    if (!name.value || name.value.length < 5) {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message(
        'Lütfen ürün adı en az 5 karakter olacak şekilde girin!',
        {
          dismissOthers: false,
          messageType: MessageType.Error,
          position: Position.TopRight,
        }
      );
      return;
    }
    if (parseFloat(price.value) < 0 || price.value == '') {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertify.message('Ürün fiyatı girilmemiş veya format hatası var', {
        dismissOthers: false,
        messageType: MessageType.Error,
        position: Position.TopRight,
      });
      return;
    }

    this.productService.create(
      create_product,
      () => {
        this.hideSpinner(SpinnerType.SquareJellyBox);
        this.alertify.message(
          `${name.value} Adlı Ürün Başarıyla Eklenmiştir.`,
          {
            dismissOthers: false,
            messageType: MessageType.Success,
            position: Position.TopRight,
            delay: 2,
          }
        );
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
