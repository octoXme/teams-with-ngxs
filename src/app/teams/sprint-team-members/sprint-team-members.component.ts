import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { IMember } from 'src/app/models/member.model';
import { ILoadable, LoadableStatus } from 'src/app/models/meta';
import { ITeam } from 'src/app/models/team.model';
import { ConfirmationDialogType } from 'src/app/services/confirmation/confirmation.model';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
import { MemberState } from 'src/app/store/members/members.state';
import { Team } from 'src/app/store/teams/teams.actions';
import { TeamState } from 'src/app/store/teams/teams.state';

@Component({
  selector: 'app-sprint-team-members',
  templateUrl: './sprint-team-members.component.html',
  styleUrls: ['./sprint-team-members.component.scss'],
})
export class SprintTeamMembersComponent implements OnInit, OnDestroy {
  @Input() sprint: string | null;
  @Input() team: ITeam;

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

  addMemberToSprintTeam(email: string): void {
    this.store.dispatch(new Team.AddMemberToTeam(email, this.team.name));
  }

  removeMemberFromSprintTeam(email: string): void {
    const confirmation = this.confirmationService.open({
      type: ConfirmationDialogType?.WARN,
      title: `Deallocate from ${this.team.name} - ${this.sprint}`,
      message: `Are you sure you want to deallocate ${email}?`,
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.store.dispatch(
          new Team.RemoveMemberFromTeam(email, this.team.name)
        );
      }
    });
  }
}
