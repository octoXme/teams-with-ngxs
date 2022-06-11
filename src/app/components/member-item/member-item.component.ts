import { Component, Input } from '@angular/core';
import { IMember } from 'src/app/models/member.model';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss'],
})
export class MemberItemComponent {
  @Input() loading: boolean = false;
  @Input() member: IMember | undefined;
  @Input() size = 32;
  photo: string | null | undefined;
}
