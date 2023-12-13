import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { Delete_Product } from 'src/app/contracts/delete_product';

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
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    try {
      const response = await firstValueFrom(
        this.httpClientService.get<{
          totalCount: number;
          products: List_Product[];
        }>({
          controller: 'Product',
          queryString: `page=${page}&size=${size}`,
        })
      );

      successCallBack?.(); // successCallBack varsa çağır

      return response;
    } catch (errorResponse: any) {
      errorCallback?.(errorResponse.message); // errorCallback varsa çağır
      throw errorResponse; // Hata tekrar fırlatılır
    }
  }

  async delete(id: string) {
    const deleteObservable: Observable<Delete_Product> =
      this.httpClientService.delete<Delete_Product>(
        {
          controller: 'Product',
        },
        id
      );
    await firstValueFrom(deleteObservable);
  }
}
