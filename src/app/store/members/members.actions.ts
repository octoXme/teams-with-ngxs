export namespace Member {
  export class getMemberByEmail {
    static readonly type = '[Member API] Fetch member by email address';
    constructor(public email: string) {}
  }
}
