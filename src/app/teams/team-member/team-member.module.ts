import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SkillRatingModule } from 'src/app/components/skill-rating/skill-rating.module';
import { UserItemModule } from 'src/app/components/user-item/user-item.module';
import { TeamMemberComponent } from './team-member.component';

@NgModule({
  declarations: [TeamMemberComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    UserItemModule,
    SkillRatingModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [TeamMemberComponent],
})
export class TeamMemberModule {}
