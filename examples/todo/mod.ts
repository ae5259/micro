import { Micro } from "../../mod.ts";
import { MicroRequest, MicroResponse } from "../../src/types.ts";

const app = new Micro();

app.get("/:id/", (req: MicroRequest, res: MicroResponse) => {
  return res.json(req.params);
});

app.get("/name/:name/", (req: MicroRequest, res: MicroResponse) => {
  return res.json(req.params);
});

app.run(3000);
