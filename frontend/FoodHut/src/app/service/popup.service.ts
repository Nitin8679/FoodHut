import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddItemDialogComponent } from '../dialog/add-item-dialog/add-item-dialog.component';
import { Item } from '../model/Item';
import { QuitConfirmDialogComponent } from '../quit-confirm-dialog/quit-confirm-dialog.component';
import { SetAmountDialogComponent } from '../set-amount-dialog/set-amount-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private snackBar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  openSnackBar(msg:string,click?:string){
    if(!click || click==''){
      click='OK'
    }

    this.snackBar.open(msg, click, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary']
    })
  }


  openAddItemDialog():Observable<Item>{
    return this.dialog.open(AddItemDialogComponent).afterClosed();
  }

  openSetAmountDialog(){
    return this.dialog.open(SetAmountDialogComponent).afterClosed();
  }
  openCofirmationDialog(message:string){
    return this.dialog.open(ConfirmationDialogComponent,{data:message}).afterClosed();
  }
  openQuitConfrimDialog(){
    return this.dialog.open(QuitConfirmDialogComponent, {disableClose:true}).afterClosed();
  }
}
