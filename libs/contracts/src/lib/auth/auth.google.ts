export namespace AuthGoogle {
  export class Request {
    provider: string;
    providerId: string;
    email: string;
    name: string;
    picture: string;
  }

  export class Response {
    access_token: string;
    refresh_token: string;
  }
}
