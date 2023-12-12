import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  /**
   *
   */
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallAtom);
    // this.httpClientService
    //   .get<Create_Product[]>({
    //     controller: 'Product',
    //   })
    //   .subscribe((data): any => {
    //     console.log(data);
    //   });
    // this.httpClientService
    //   .post(
    //     {
    //       controller: 'Product',
    //     },
    //     {
    //       name: 'Kalem',
    //       stock: 100,
    //       price: 90,
    //     }
    //   ).subscribe();
    // this.httpClientService
    //   .post(
    //     {
    //       controller: 'Product',
    //     },
    //     {
    //       name: 'Tablet',
    //       stock: 10,
    //       price: 900,
    //     }
    //   )
    //   .subscribe();
    // this.httpClientService
    //   .post(
    //     {
    //       controller: 'Product',
    //     },
    //     {
    //       name: 'Bilgisayar',
    //       stock: 3,
    //       price: 9000,
    //     }
    //   ).subscribe();
    // this.httpClientService
    //   .put(
    //     {
    //       controller: 'Product',
    //     },
    //     {
    //       id: "ddd68b99-40c8-4b99-0ef6-08dbf765ec85",
    //       name: 'Monster Abra',
    //       stock: 6,
    //       price: 11000,
    //     }
    //   ).subscribe();
    // this.httpClientService
    //   .delete(
    //     {
    //       controller: 'Product',
    //     },
    //     '8e8efcfc-c1ae-4064-0ef4-08dbf765ec85'
    //   )
    //   .subscribe();
    // this.httpClientService
    //   .get({
    //     baseUrl: 'https://jsonplaceholder.typicode.com',
    //     controller: 'posts',
    //   })
    //   .subscribe((data): any => console.log(data));
    //   this.httpClientService
    //     .get({
    //       fullEndPoint: 'https://jsonplaceholder.typicode.com/posts',
    //     })
    //     .subscribe((data): any => console.log(data));
  }

  @ViewChild(ListComponent) listComponents!: ListComponent;

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }
}
