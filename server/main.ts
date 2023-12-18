import { Hono } from 'https://deno.land/x/hono/mod.ts'
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { PostgresMigrate } from "https://deno.land/x/migrate@0.2.5/postgres.ts";
import { apply } from "https://deno.land/x/migrate@0.2.5/basic.ts";
import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.142.0/path/mod.ts";

const app = new Hono()
const client = new Client()
const sockets: Set<WebSocket> = new Set([]);

interface LogEntry {
  username: string,
  color: string,
  msg: string,
}

app.get('/chat', async (c) => {
  const { rows } = await client.queryObject<LogEntry>(
    "SELECT username, color, msg FROM chat_log"
  );
  return c.json(rows);
});

app.get('/ws', (c) => {
  const { response, socket } = Deno.upgradeWebSocket(c.req.raw)
  sockets.add(socket);
  socket.addEventListener('close', (e) => {
    sockets.delete(socket);
  })
  socket.addEventListener('message', async (e) => {
    let entry = JSON.parse(e.data)
    client.queryArray(
      "INSERT INTO chat_log (username, color, msg) VALUES ($1, $2, $3)",
      [entry.username, entry.color, entry.msg],
    )
    sockets.forEach((socket) => {
      socket.send(e.data);
    })
  })
  return response
})

if (import.meta.main) {
  console.log("Server starting up")
  console.log("Trying to connect to postgres")
  await client.connect()
  const migrationsDir = resolve(dirname(fromFileUrl(import.meta.url)), "./migrations");
  console.log("Applying DB migrations", migrationsDir);
  const migrate = new PostgresMigrate({
    migrationsDir,
    client: {},
  });
  await apply(migrate)
  console.log("Starting Web API")
  Deno.serve({ hostname: "0.0.0.0" }, app.fetch)
}
