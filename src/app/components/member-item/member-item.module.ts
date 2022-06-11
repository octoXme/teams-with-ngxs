import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberAvatarModule } from '../member-avatar/member-avatar.module';
import { MemberItemComponent } from './member-item.component';

@NgModule({
  declarations: [MemberItemComponent],
  imports: [CommonModule, MemberAvatarModule],
  exports: [MemberItemComponent],
})
export class MemberItemModule {}
