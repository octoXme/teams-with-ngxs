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
import {
  IMember,
  SkillDescription,
  SkillName,
} from 'src/app/models/member.model';
import { LoadableStatus } from 'src/app/models/meta';
import { Member } from 'src/app/store/members/members.actions';
import { MemberState } from 'src/app/store/members/members.state';

interface ISkillRating {
  rating: number;
  name: string;
  description: string;
}

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
  memberSkills: ISkillRating[] = [];
  memberSubscription: Subscription = new Subscription();

  isOpen: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.memberSubscription = this.store
      .select(MemberState.selectMemberByEmail(this.email))
      .subscribe((data) => {
        this.loading = data?.status === LoadableStatus.Loading ?? false;
        this.member = data?.value;
        const skills = data?.value?.skills;
        if (skills) {
          for (const [key, value] of Object.entries(skills)) {
            this.memberSkills.push({
              rating: value,
              name: SkillName.get(key) ?? '',
              description: SkillDescription.get(key) ?? '',
            });
          }
        }
      });
    this.store.dispatch(new Member.getMemberByEmail(this.email));
  }

  onRemoveMember(event: Event): void {
    event.stopPropagation();
    this.removeMember.emit(this.email);
  }

  onClosed(): void {
    this.isOpen = false;
  }

  onOpened(): void {
    this.isOpen = true;
  }

  ngOnDestroy(): void {
    this.memberSubscription?.unsubscribe();
  }
}
