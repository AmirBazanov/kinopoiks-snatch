export namespace AuthVk {
  export class Request {
    providerId: string;
    email: string | null;
    name: string;
    picture: string;
  }

  export class Response {
    access_token: string;
    refresh_token: string;
  }
}
