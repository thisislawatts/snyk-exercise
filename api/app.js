const Koa = require("koa");
const cors = require("kcors");
const route = require("koa-path-match")();
const app = new Koa();

const Inspect = require("./src/inspect");

app.use(cors());

app.use(
  route("/package/:name/:version?", async (ctx, next) => {
    ctx.body = await Inspect(ctx.params.name, ctx.params.version, 2);
  })
);

app.listen(3000);
