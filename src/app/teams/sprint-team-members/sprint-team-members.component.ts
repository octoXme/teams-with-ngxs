import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { IMember } from 'src/app/models/member.model';
import { ILoadable, LoadableStatus } from 'src/app/models/meta';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
import { MemberState } from 'src/app/store/members/members.state';
import { TeamState } from 'src/app/store/teams/teams.state';

@Component({
  selector: 'app-sprint-team-members',
  templateUrl: './sprint-team-members.component.html',
  styleUrls: ['./sprint-team-members.component.scss'],
})
export class SprintTeamMembersComponent implements OnInit, OnDestroy {
  @Input() members: string[];

  @Select(MemberState.selectMembers) allMembers$: Observable<
    ILoadable<IMember>[]
  >;
  @Select(TeamState.selectCurrentSprintUnallocated)
  unallocatedMemberEmails$: Observable<string[]>;

  availableOptions: IMember[] = [];
  subscription: Subscription;

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.unallocatedMemberEmails$,
      this.allMembers$,
    ]).subscribe(([availableEmails, members]) => {
      const userArray: IMember[] = [];
      availableEmails.map((email) => {
        const matched = members.find(
          (member) =>
            member.value?.email === email &&
            member.status === LoadableStatus.Loaded
        )?.value;

        const existed =
          userArray.findIndex((member) => member.email === matched?.email) > 1;
        if (matched && !existed) {
          userArray.push(matched);
        }
      });
      this.availableOptions = userArray;
    });
  }

  ngOnDestroy(): void {}

  addMemberToSprintTeam(email: string): void {}

  removeMemberFromSprintTeam(email: string): void {}
}
