---
sidebar_position: 8
---

# Text and Asset Localization

> Documentation version: **0.5.0**

Localization is no longer part of LCGUdonSharp. In 0.4.0 it moved to the separate [**LCG Localization**](../lcglocalization/intro.md) package (`com.logiccuteguy.lcglocalization`), which works with the VRChat SDK's UdonSharp and with LCGUdonSharp.

## Moving an existing project

1. Install **LCG Localization** alongside LCGUdonSharp.
2. Existing scene references stay connected, because the script GUIDs are unchanged.
3. The menus are now under **Tools > LCG Localization**.

## Guides

- [Overview](../lcglocalization/intro.md)
- [Unity String Tables](../lcglocalization/unity-tables.md)
- [Localized assets](../lcglocalization/assets.md)
- [JSON tables](../lcglocalization/legacy-json.md)
