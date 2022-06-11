import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-avatar',
  templateUrl: './member-avatar.component.html',
  styleUrls: ['./member-avatar.component.scss'],
})
export class MemberAvatarComponent {
  @Input() photo: string | null | undefined;
  @Input() name: string | null | undefined;
  @Input() size: number | undefined;
  @Input() loading: boolean | undefined;
}
