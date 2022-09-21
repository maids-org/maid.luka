import { initializer, polling, webhook } from "./core.ts";
import { env } from "./utils.ts";

export const launch = async () => {
  switch (env["HOST"]) {
    case "WEBHOOK":
      await initializer();
      await webhook();
      break;
    case "POLLING":
      await initializer();
      await polling();
      break;
    default:
      throw new Error("Deploy method not validated!");
  }
};

await launch();
