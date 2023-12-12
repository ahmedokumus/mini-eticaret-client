import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom } from 'rxjs';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'Product',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack!();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br><br>`;
            });
          });
          errorCallBack!(message);
        }
      );
  }

  async list(
    successCallBack: () => void,
    errorCallBack: (errorMessage: string) => void
  ): Promise<{ products: List_Product[] }> {
    const promiseData: Promise<{ products: List_Product[] }> = firstValueFrom(
      this.httpClientService.get<{ products: List_Product[] }>({
        controller: 'Product',
      })
    );

    promiseData
      .then((p) => successCallBack!())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack!(errorResponse.message)
      );

    return await promiseData;
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalCount: number;
      products: List_Product[];
    }> = firstValueFrom(
      this.httpClientService.get<{
        totalCount: number;
        products: List_Product[];
      }>({
        controller: 'Product',
        queryString: `page=${page}&size=${size}`,
      })
    );

    promiseData
      .then((p) => successCallBack!())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallback!(errorResponse.message)
      );

    return await promiseData;
  }
}
