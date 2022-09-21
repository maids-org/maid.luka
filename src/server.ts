import { serve } from "./deps.ts";
import { bot } from "./core.ts";

export default async (handle: any) => {
  await serve(async (req: Request) => {
    const url = new URL(req.url);

    if (req.method == "POST") {
      switch (url.pathname) {
        case "/bot":
          return await handle(req);
        case "/cron":
          return new Response("CRON Timetable Schedule Message");
        default:
          return new Response("What you're trying to post?");
      }
    }

    switch (url.pathname) {
      case "/webhook":
        try {
          await bot.api.setWebhook(`https://${url.hostname}/bot`);
          return new Response("Done. Set");
        } catch (_) {
          return new Response("Couldn't succeed with installing webhook");
        }
      default:
        return Response.redirect("https://slaves.instatus.com/", 302);
    }
  });
};
