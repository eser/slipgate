import { getUser } from "./google-session.ts";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  const info: Record<string, unknown> = {
    headers: Object.fromEntries(req.headers.entries()),
    url: url.toString(),
    method: req.method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
  };

  const cookies = req.headers.get("cookie");

  if (cookies !== null) {
    const cookieMap = new Map(
      cookies.split(";").map((cookie) => {
        const [key, value] = cookie.trim().split("=");
        return [key, value];
      }),
    );

    const access_token = cookieMap.get("access_token");
    if (access_token !== undefined) {
      info.user = await getUser(access_token);
    }
  }

  return new Response(JSON.stringify(info, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}

if (import.meta.main) {
  Deno.serve(handler);
}

export default {
  fetch: handler,
} satisfies Deno.ServeDefaultExport;
