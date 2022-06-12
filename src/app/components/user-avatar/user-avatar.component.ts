import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() photo: string | null | undefined;
  @Input() name: string | null | undefined;
  @Input() size: number | undefined;
  @Input() loading: boolean | undefined;
}
