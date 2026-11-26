---
sidebar_position: 3
---

# Localized assets

Images, textures, audio and GameObjects can change with the language.

## With Unity Asset Tables

Add your **Asset Table Collections** to the **Asset Table Collections** array on the source. Then add Unity's components and connect their events.

| Component | Connect to |
|---|---|
| **Localize Sprite Event** | `Image.sprite` |
| **Localize Texture Event** | `RawImage.texture` |
| **Localize Audio Clip Event** | `AudioSource.clip` |
| **LCG Localization > Localize Prefab Event** | No callback needed |

Assets are resolved **during the bake**, including named sub-assets. A missing entry uses the default locale, then the component's original asset. Arbitrary asset callbacks and per-asset locale overrides are rejected.

:::note
Every language variant ships inside the world, so many large variants increase the download size.
:::

### Prefabs

The bake creates one child for each locale and shows the right one. The objects are local, and nothing is spawned over the network.

Use LCG's **Localize Prefab Event** rather than Unity's. It removes its preview safely in Edit mode, while Unity Localization 1.4.5's own event can log an editor error when you switch previews.

## With existing scene objects

For GameObjects or materials already in your scene, add **LCG Localized Asset** to a parent that is **always active**.

1. Assign the manager in **Localization**.
2. Enter the language codes in **Languages**.
3. Fill **Variants** for GameObjects, or **Assets** for sprites, textures, clips or materials, in the same order as the codes.
4. Set the matching target:

| Asset | Field |
|---|---|
| Sprite | **Image** |
| Texture | **Raw Image** |
| Audio clip | **Audio Source** |
| Material | **Target Renderer** |

One component holds **one** set of localized assets. The manager finds these components during the bake.

### Audio

By default, a language change swaps the clip and stops the previous one. Turn on **Play Audio On Change** to start the new clip.

The tones in the example scene only show clips switching. They aren't spoken translations.
