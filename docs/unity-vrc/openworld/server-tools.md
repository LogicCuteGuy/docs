---
sidebar_position: 5
---

# Server tools

The package includes the Rust source of two optional programs. You don't need either one to use OpenWorld.

| Program | Folder | Runs on | Purpose |
|---|---|---|---|
| `openworld-host` | `Server~` | Your server | Serves stream data, accepts deploys, receives world messages |
| `openworld-link` | `Link~` | A player's Windows PC | Forwards messages from the VRChat log to your server |

Build either one with `cargo build --release` in its folder.

## openworld-host

```bash
openworld-host --dir site --port 8080 --token-file token.txt
```

| Argument | Default | Meaning |
|---|---|---|
| `--dir` | `site` | Folder of served files |
| `--bind` | `0.0.0.0` | Listen address |
| `--port` | `8080` | Listen port |
| `--token-file` | none | Deploy token. The `OPENWORLD_TOKEN` environment variable also works. |
| `--keys` | `keys` | Folder of per-world message keys |
| `--data` | `data` | Folder where messages are saved |

| Route | Does |
|---|---|
| `GET /<world>/<file>` | Serves `site/<world>/<file>`. `GET /<file>` works for a single world. |
| `PUT /_deploy/<world>` | Unpacks a **Package for Host** zip |
| `POST /ipc` | Receives messages from `openworld-link` |

Deploy is off without a token, and the token must be at least 16 characters. A deploy writes data files first and the manifest last, so players never get a manifest whose files are missing. It never deletes files, because an older uploaded world may still request them. The zip limit is 512 MB, or 2 GB unpacked.

```bash
curl -X PUT -H "Authorization: Bearer $(cat token.txt)" \
  --data-binary @Stream_xxx.zip https://cdn.example.com/_deploy/myworld
```

:::warning HTTPS and trusted URLs
The server has no TLS. Put it behind Caddy, nginx or a Cloudflare Tunnel. Your own domain isn't on VRChat's trusted URL list, so players need **Allow Untrusted URLs**. VRChat doesn't follow redirects.
:::

## Sending messages out of VRChat

:::note
Check VRChat Persistence first. Per-player saves need no extra app. Use this only when data must **leave** VRChat, for example for cross-instance leaderboards or a web map.
:::

The world writes a line to the VRChat log. `openworld-link` on the player's PC reads it and posts it to your server.

1. **Server:** put a long random secret in `keys/<world>.txt`, then run `openworld-host --keys keys --data data` behind HTTPS.
2. **World:** add **OpenWorldLink** to a GameObject. Set **Server Url** (ending in `/`), **World Name** (the key file's name, without dots) and **Key** (the same secret).
3. **Player:** run `openworld-link` while playing, and answer `y` when it asks about your server.

```csharp
public OpenWorldLink link;

public void _SubmitScore(int score)
{
    link._Send("score", "{\"score\":" + score + "}");
}
```

Keep each message under about 1 KB. `type` is one short word without spaces.

### Security

The key ships inside the world, and a world can be decompiled. The message signature stops casual log edits and copy-paste, **not** a determined cheater. Validate every value on your server.

### What the client sends

It reads only OpenWorld message lines, plus VRChat's sign-in line to get the player's `usr_` id. It sends nothing else from the log. It asks for consent once per new server, and requires HTTPS except for localhost testing. While the server is offline it queues up to 1 MB and retries.

It runs on **Windows only**. Quest and other mobile players can't send messages.

### What the server stores

The server checks each line's signature and sequence number, then appends it to `data/<world>/<date>.jsonl`, using UTC dates. Your own code reads those files.

| Limit | Value |
|---|---|
| Line size | 2 KB |
| Lines per request | 500 |
| Request body | 256 KB |
| Requests per IP | 10 per second |

Replay protection is kept in memory, so after a restart the server accepts old lines once. Sending data **back** to a specific player isn't built yet.
