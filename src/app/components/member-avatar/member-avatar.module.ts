import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisplayNameInitials } from 'src/app/pipes/display-name-initials.pipe';
import { MemberAvatarComponent } from './member-avatar.component';

@NgModule({
  declarations: [DisplayNameInitials, MemberAvatarComponent],
  imports: [CommonModule],
  exports: [MemberAvatarComponent],
})
export class MemberAvatarModule {}
