import { cache } from "react";
import { kv } from "@vercel/kv";

export const getViews = cache(async () => {
  const views = (await kv.get<number>("siteviews")) ?? 0;
  return views;
});
