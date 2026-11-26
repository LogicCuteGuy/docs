---
sidebar_position: 2
---

# Getting started with StreamData

## 1. Set up the component

1. Save your scene.
2. Create a GameObject and add the **StreamData** UdonSharp behaviour.
3. Add the materials to stream to **Stream Materials**. Their colour textures (sRGB, texture type Default) are streamed.

| Setting | Default | Meaning |
|---|---|---|
| **Base Url** | | Folder URL of the exported files, ending in `/`. |
| **Backup Base Url** | | Optional second host. |
| **Fallback Size** | 128 | Longest side of the textures that ship in the world. |
| **Max Stream Size** | 1024 | Longest side of the streamed textures, at most 2048. |
| **Stream Lightmaps** | off | Also stream the scene's colour lightmaps. |
| **Lightmap Ship Size** | 0 | When above 0, Export Stream sets the Max Size of the scene's lightmap textures to this. |
| **Load Distance** | 0 | Metres within which textures download. 0 downloads everything, nearest first, and never unloads. |
| **Unload Factor** | 1.5 | Textures farther than Load Distance × this return to their fallback. |

:::note
**Lightmap Ship Size** changes the import settings of your lightmap textures.
:::

## 2. Export

Click **Export Stream**. It writes the full-size data to `<scene>_StreamData/Export~` and makes the fallback textures. Export again after you change textures, materials or URLs.

Your materials aren't modified. Builds and Play mode use copies with the fallback textures.

## 3. Test in the editor

Set **Base Url** to a localhost address such as `http://localhost:8765/`, export, then click **Start Test Server**. The server only listens on localhost and logs each request in the Console. If you set up publishing below, **Play Mode Uses Export~** does this for you.

## 4. Publish

Open **Tools > StreamData > Publish** and choose a host.

### GitHub Pages

GitHub Pages (`*.github.io`) is on VRChat's trusted URL list, so it works for players with default settings.

1. Sign in once with `gh auth login`. **Check gh Login** shows the status.
2. Enter **Repo** as `owner/name`, or use **Select**. **Create Repo** makes a new public repository.
3. Click **Enable Pages**.
4. Set **World Folder**. One repository can hold all your worlds, one folder each.
5. Click **Publish Now**.

:::warning Publishing is public, and automatic by default
Files in a public Pages repository are visible to anyone. Once a host is set, **Export Before Build** and **Publish On Build** are **on by default**: every VRChat build, including Build & Test, exports and publishes. If publishing fails, the build stops. Turn them off to publish manually.
:::

Publishing never deletes old files, because a world uploaded with an older export may still request them.

### Your own host

You can use `openworld-host`, a small Rust server whose source is in the [OpenWorld](https://github.com/LogicCuteGuy/OpenWorld) package under `Server~`. Enter its URL and deploy token. The token is stored only on your PC. You can also click **Package for Host** and upload the zip's contents to any static host.

Your own domain isn't on VRChat's trusted URL list. Players must turn on **Allow Untrusted URLs**. You can use your host as **Backup Base Url** with GitHub Pages first. VRChat doesn't follow redirects, so URLs must point straight at the files.

## At runtime

The `manifest` file downloads first. If it fails, for example offline or with a blocked URL, no images are requested and the world keeps its fallbacks. Images then download one at a time, nearest to the player first. VRChat allows one image per 5 seconds, so a large world takes a while to fill in.

Don't edit the fields under **Baked**. Export Stream writes them.

## Troubleshooting

| Symptom | Check |
|---|---|
| Textures stay blurry | Open Base Url + `manifest` in a browser. Check the URL ends in `/` and that you published after the last export. |
| Works on your PC but not for others | The host isn't `*.github.io`, so players need Allow Untrusted URLs. |
| A changed texture doesn't update | Export again and publish. If you changed URLs, upload the world again. |
| The build stops while publishing | Read the Console error, run **Check gh Login**, or turn off **Publish On Build**. |
