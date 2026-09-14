export function GET() {
  return new Response(
    JSON.stringify({ version: import.meta.env.PUBLIC_BUILD_ID ?? "local" }),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
}
