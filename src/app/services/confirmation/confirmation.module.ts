import { NgModule } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [DialogModule],
  providers: [ConfirmationService],
})
export class ConfirmationModule {}
