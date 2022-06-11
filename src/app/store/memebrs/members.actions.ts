export namespace Member {
  export class getMemberByEmail {
    static readonly type = '[User API] Fetch Member By Email Address';
    constructor(public emails: string) {}
  }
}
