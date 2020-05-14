import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("🦕 server is now online at http://localhost:8000/");

let numberOfRequests = 0
for await (const req of s) {
  console.log(`Request #${++numberOfRequests}: ${req.method} ${req.url}`);
  req.respond({ body: "Hello World\n" });
}
