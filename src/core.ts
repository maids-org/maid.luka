import { blue, Bot, Composer, Context, webhookCallback } from "./deps.ts";
import "./utils.ts";
import { env } from "./utils.ts";
import delta from "./delta/mod.ts";
import server from "./server.ts";

export const bot = new Bot(env["TOKEN"] || "");
// export const dungeon = new Dungeon(env["SUP_URL"], env["SUP_KEY"]);
export const handle = webhookCallback(bot, "std/http");
export const composer = (mod: Composer<Context>) => {
  bot.use(mod);
};

export const initializer = async () => {
  await console.log(blue("[INFO]"), `bot is starting on ${env["HOST"]}`);
  await delta(bot);
};

export const webhook = async () => {
  await server(handle);
};

export const polling = async () => {
  await bot.start();
};
