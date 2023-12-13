import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    const deleteButton = _renderer.createElement('button');
    deleteButton.setAttribute('mat-raised-button', '');
    deleteButton.setAttribute(
      'mat-ripple-loader-class-name',
      'mat-mdc-button-ripple'
    );
    deleteButton.setAttribute(
      'class',
      'mdc-button mdc-button--raised mat-mdc-raised-button mat-warn mat-mdc-button-base'
    );
    deleteButton.setAttribute('color', 'warn');
    deleteButton.textContent = 'Sil'; // .innerText="sil"
    _renderer.appendChild(element.nativeElement, deleteButton);
  }

  @Input() id: any;
  @Input() controller: any;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService
        .delete(
          {
            controller: this.controller,
          },
          this.id
        )
        .subscribe(
          (data) => {
            $(td.parentElement).animate(
              {
                opacity: 0,
                left: '+=50',
                height: 'toogle',
              },
              600,
              () => {
                this.callBack.emit();
                this.alertify.message('Ürün başarıyla silinmiştir!', {
                  dismissOthers: true,
                  messageType: MessageType.Warning,
                  position: Position.TopRight,
                });
              }
            );
          },
          (errorResponse: HttpErrorResponse) => {
            this.alertify.message(
              'Ürün silinirken beklenmeyen bir hata oluştu!',
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight,
              }
            );
            this.spinner.hide(SpinnerType.BallAtom);
          }
        );
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}