import { IMember } from 'src/app/models/member.model';

export namespace Team {
  export class GetSprintTeams {
    static readonly type = '[Team API] Fetch SprintTeams';
  }

  export class SetCurrentSprint {
    static readonly type = '[Team Page] Set Current Sprint';
    constructor(public sprintKey: number) {}
  }

  export class AddMemberToTeam {
    static readonly type = '[Team Page] Add Member';
    constructor(public member: IMember, public teamSprintId: string) {}
  }

  export class RemoveMemberFromTeam {
    static readonly type = '[Team Page] Remove Member';
    constructor(public member: IMember, public teamSprintId: string) {}
  }
}
