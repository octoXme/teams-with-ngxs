import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisplayNameInitials } from 'src/app/pipes/display-name-initials.pipe';
import { UserAvatarComponent } from './user-avatar.component';

@NgModule({
  declarations: [DisplayNameInitials, UserAvatarComponent],
  imports: [CommonModule],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
