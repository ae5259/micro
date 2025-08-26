export class Context {
  req: MicroRequest;
  res: MicroResponse;

  constructor(req: MicroRequest, res: MicroResponse) {
    this.req = req;
    this.res = res;
  }

  async json(data: unknown) {
    return await this.res.json(data);
  }
}

export class MicroRequest {
  private url: URL;
  public params;

  constructor(public request: Request) {
    this.url = new URL(request.url);
    this.params = this.queryParams();
  }

  queryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    for (const [key, value] of this.url.searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }

  async json() {
    return await this.request.json();
  }

  query(param: string): string | null {
    return this.url.searchParams.get(param);
  }
}

export class MicroResponse {
  private headers = new Headers({ "Content-Type": "application/json" });
  private body: BodyInit = "";

  status(code: number) {
    this.headers.set("status", code.toString());
    return this;
  }

  json(data: unknown) {
    this.body = JSON.stringify(data);
    return this;
  }

  toResponse() {
    return new Response(this.body, { headers: this.headers });
  }
}

export type Handler = (ctx: Context) => void;
export type Route = { method: string; path: string; handler: Handler };
