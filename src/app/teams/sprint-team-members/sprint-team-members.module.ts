import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { AddTeamMemberModule } from '../add-team-member/add-team-member.module';
import { TeamMemberModule } from '../team-member/team-member.module';
import { SprintTeamMembersComponent } from './sprint-team-members.component';

@NgModule({
  declarations: [SprintTeamMembersComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    AddTeamMemberModule,
    MatCardModule,
    MatIconModule,
    TeamMemberModule,
  ],
  exports: [SprintTeamMembersComponent],
})
export class SprintTeamMembersModule {}
