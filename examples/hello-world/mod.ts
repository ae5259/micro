import { Micro } from "../../src/mod.ts";

const app = new Micro();

app.get("/", async (ctx) => {
  return await ctx.json("OK");
});

app.get("/:user", (ctx) => {
  console.log(ctx.req.params);

  return ctx.json("OK");
});

app.post("/post", async (ctx) => {
  const body = await ctx.req.json();
  return ctx.json(body);
});

app.run(3000);
