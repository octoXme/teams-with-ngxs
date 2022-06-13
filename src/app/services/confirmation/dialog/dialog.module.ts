import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './dialog.component';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
  exports: [ConfirmationDialogComponent],
})
export class DialogModule {}
