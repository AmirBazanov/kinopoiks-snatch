// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateUserContract {
  export class Request {
    private readonly email: string;
    private readonly password: string;
    private readonly user_name: string;
    private readonly community: string;
    private readonly birthday: string;
    private readonly gender: boolean;
    private readonly quote: string;
  }

  export class Response {
    access_token: string;
  }
}
