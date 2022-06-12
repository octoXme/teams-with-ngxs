import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-team-members',
  templateUrl: './sprint-team-members.component.html',
  styleUrls: ['./sprint-team-members.component.scss'],
})
export class SprintTeamMembersComponent implements OnInit {
  @Input() members: string[];

  constructor() {}

  ngOnInit(): void {}
}
