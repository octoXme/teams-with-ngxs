import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { IMember } from 'src/app/models/member.model';
import { LoadableStatus } from 'src/app/models/meta';
import { Member } from 'src/app/store/members/members.actions';
import { MemberState } from 'src/app/store/members/members.state';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss'],
})
export class TeamMemberComponent implements OnInit, OnDestroy {
  @Input() email: string;
  @Input() disabled: boolean;
  @Output() removeMember = new EventEmitter<string>();

  member: IMember | null;
  loading: boolean;
  memberSubscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.memberSubscription = this.store
      .select(MemberState.selectMemberByEmail(this.email))
      .subscribe((data) => {
        this.loading = data?.status === LoadableStatus.Loading ?? false;
        this.member = data?.value;
      });
    this.store.dispatch(new Member.getMemberByEmail(this.email));
  }

  onRemoveMember(email: string | undefined): void {
    this.removeMember.emit(email);
  }

  ngOnDestroy(): void {
    this.memberSubscription?.unsubscribe();
  }
}
