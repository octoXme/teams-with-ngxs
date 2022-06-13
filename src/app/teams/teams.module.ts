import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PageLoaderModule } from '../components/page-loader/page-loader.module';
import { PageNavigationModule } from '../components/page-navigation/page-navigation.module';
import { DisplayDateRange } from '../pipes/display-date-range.pipe';
import { ConfirmationModule } from '../services/confirmation/confirmation.module';
import { MemberState } from '../store/members/members.state';
import { TeamState } from '../store/teams/teams.state';
import { SprintTeamMembersModule } from './sprint-team-members/sprint-team-members.module';
import { SprintTeamsModule } from './sprint-teams/sprint-teams.module';
import { TeamsComponent } from './teams.component';
import { teamsRoutes } from './teams.routes';

@NgModule({
  declarations: [TeamsComponent, DisplayDateRange],
  imports: [
    CommonModule,
    RouterModule.forChild(teamsRoutes),
    NgxsModule.forFeature([TeamState, MemberState]),
    PageLoaderModule,
    PageNavigationModule,
    MatTabsModule,
    MatProgressBarModule,
    SprintTeamMembersModule,
    SprintTeamsModule,
    ConfirmationModule,
  ],
})
export class TeamsModule {}
