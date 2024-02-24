import { Component, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quit-confirm-dialog',
  templateUrl: './quit-confirm-dialog.component.html',
  styleUrls: ['./quit-confirm-dialog.component.css']
})
export class QuitConfirmDialogComponent {
  
  constructor(
    public dialogRef:MatDialogRef<any>,
    private elementRef: ElementRef
  ){}

  onOverlayClick(event: MouseEvent): void {
    if (event.target === this.elementRef.nativeElement) {
      // Clicked on the overlay (outside the dialog)
      this.dialogRef.close(false); // Treat it as "No" or cancel
    }
  }
}
