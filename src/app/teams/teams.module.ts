import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PageLoaderModule } from '../components/page-loader/page-loader.module';
import { PageNavigationModule } from '../components/page-navigation/page-navigation.module';
import { UserAvatarModule } from '../components/user-avatar/user-avatar.module';
import { UserItemModule } from '../components/user-item/user-item.module';
import { DisplayDateRange } from '../pipes/display-date-range.pipe';
import { MemberState } from '../store/members/members.state';
import { TeamState } from '../store/teams/teams.state';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { SprintTeamMembersComponent } from './sprint-team-members/sprint-team-members.component';
import { SprintTeamsComponent } from './sprint-teams/sprint-teams.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { TeamsComponent } from './teams.component';
import { teamsRoutes } from './teams.routes';

@NgModule({
  declarations: [
    TeamsComponent,
    DisplayDateRange,
    SprintTeamsComponent,
    SprintTeamMembersComponent,
    TeamMemberComponent,
    AddTeamMemberComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(teamsRoutes),
    NgxsModule.forFeature([TeamState, MemberState]),
    PageLoaderModule,
    PageNavigationModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCardModule,
    UserAvatarModule,
    UserItemModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class TeamsModule {}
