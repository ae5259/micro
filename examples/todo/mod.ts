import { Micro } from "../../mod.ts";

const app = new Micro();

app.post("/", async (ctx) => {
  const body = await ctx.req.json();

  console.log(body);
  return await ctx.json({ "ok": true });
});

app.get("/:id/", async (ctx) => {
  console.log("here");

  return await ctx.json(ctx.req.params);
});

app.get("/name/:name/", async (ctx) => {
  return await ctx.json(ctx.req.params);
});

app.run(3000);
