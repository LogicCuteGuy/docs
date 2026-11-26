---
sidebar_position: 3
---

# Publishing stream data

Open **Tools > StreamData > Publish** and choose a host. One GitHub Pages repository or one server holds all your worlds, one folder each. **Base Url** is the site root, then the world folder, then `/`.

## Publish window

| Setting | Default | Meaning |
|---|---|---|
| **Repo** | | `owner/name` of the Pages repository. It must be public for free GitHub Pages. |
| **Branch** | `main` | The branch GitHub Pages serves |
| **Custom Domain** | empty | Use it if your Pages site has its own domain |
| **Host Url** | | Your `openworld-host` address |
| **Deploy Token** | | The host's token. Stored on this PC only. |
| **World Folder** | Scene name, spaces as `-` | This scene's folder on the host |
| **Export Before Build** | on | Export before every VRChat build |
| **Publish On Build** | on | Publish before every VRChat build |
| **Play Mode Uses Export~** | on | Play mode reads local files through the test server |

The settings are saved in `ProjectSettings/StreamDataPublish.json`, so you can share them with your team. The deploy token isn't in that file.

**Export** sets the Base Url on every StreamData in the scene, exports, and **saves the scene**. **Publish Now** uploads the last export. If the URLs baked into the world don't match the publish settings, it asks you to export first.

## GitHub Pages

GitHub Pages (`*.github.io`) is on VRChat's trusted URL list, so it works for players with default settings.

1. Install `git` and the GitHub CLI, then sign in once with `gh auth login`. **Check gh Login** shows the status.
2. Enter **Repo**, or use **Select**. **Create Repo** makes a new **public** repository.
3. Click **Enable Pages**.
4. Set **World Folder**.
5. Click **Publish Now**. Pages may take a minute to update.

| Repository name | Site root |
|---|---|
| `owner/owner.github.io` | `https://owner.github.io/` |
| `owner/name` | `https://owner.github.io/name/` |

:::note
A **Custom Domain** isn't on VRChat's trusted URL list. Only `*.github.io` is.
:::

StreamData keeps its own clone of the repository in `Library/StreamDataPublish/`. Each publish copies the export into the world folder, adds `files.txt` and `.nojekyll`, then commits and pushes. If nothing changed, it reports that the folder is already up to date. A single file must be under GitHub's 100 MB limit.

## Automatic publishing on build

:::warning Publishing is public, and automatic by default
Files in a public Pages repository are visible to anyone. Once a host is set, every VRChat world build, including Build & Test, exports and publishes the active scene. If either step fails, the build stops. Turn off **Export Before Build** and **Publish On Build** to publish manually.
:::

## Your own server

[`openworld-host`](../openworld/server-tools.md) is a small Rust server whose source ships in the OpenWorld package. Enter its **Host Url** and **Deploy Token**. Publishing packages the export and sends it to the server.

Players must turn on **Allow Untrusted URLs** for your own domain. To keep default players working, use GitHub Pages as **Base Url** and your server as **Backup Base Url**. VRChat doesn't follow redirects, so URLs must point straight at the files.

## Any static host

**Package for Host** on the StreamData Inspector writes a zip to `<scene>_StreamData/Package~/`. Upload its **contents** to the Base Url. Players never download the zip itself.

| Extra file | Purpose |
|---|---|
| `files.txt` | Name, size and MD5 of each file |
| `.nojekyll` | Makes GitHub Pages serve the files unchanged |
| `_headers` | Stops Cloudflare Pages and Netlify from caching the manifest |

Packaging is refused if Base Url is empty or points to localhost, if nothing was exported, or if Base Url changed since the last export.

## Updating a published world

File names come from the content, so a changed texture gets a new file and never replaces one that an uploaded world reads. Publishing never deletes old files. The URLs are baked into the world, so after adding or changing textures, export, publish **and upload the world again**.
