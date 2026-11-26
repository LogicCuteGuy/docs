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

:::warning Publishing is public, and automatic by default
Once a host is set, every VRChat build, including Build & Test, exports and publishes. See [Publishing stream data](./publishing.md) before your first build.
:::

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
