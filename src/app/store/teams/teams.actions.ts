export namespace Team {
  export class GetSprintTeams {
    static readonly type = '[Team API] Fetch sprint teams';
  }

  export class SetCurrentSprint {
    static readonly type = '[Team Page] Set current sprint';
    constructor(public sprintKey: number) {}
  }

  export class AddMemberToTeam {
    static readonly type = '[Team Page] Add member to current sprint team';
    constructor(public email: string, public team: string) {}
  }

  export class RemoveMemberFromTeam {
    static readonly type = '[Team Page] Remove member from current sprint';
    constructor(public email: string, public team: string) {}
  }
}
