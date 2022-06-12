export namespace Member {
  export class getMemberByEmail {
    static readonly type = '[Member API] Fetch Member By Email Address';
    constructor(public email: string) {}
  }
}
