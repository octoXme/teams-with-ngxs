import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SprintTeamMembersModule } from '../sprint-team-members/sprint-team-members.module';
import { SprintTeamsComponent } from './sprint-teams.component';

@NgModule({
  declarations: [SprintTeamsComponent],
  imports: [CommonModule, SprintTeamMembersModule],
  exports: [SprintTeamsComponent],
})
export class SprintTeamsModule {}
