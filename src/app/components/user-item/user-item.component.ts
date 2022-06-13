import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input() loading: boolean;
  @Input() selected: boolean;

  @Input() name: string | undefined;
  @Input() size = 32;
  @Input() photo: string | undefined;
}
