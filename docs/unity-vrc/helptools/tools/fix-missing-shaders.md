---
sidebar_position: 3
---

# Fix Missing Shader On Prefab

**Menu Path**: `Right-click Prefab Asset > Fix Missing Shaders (Prefab → Standard)`

A specialized cleanup tool for fixing "Pink" broken materials inside Prefab assets, commonly caused by missing shaders or shader errors after importing assets from different Unity versions or render pipelines.

## Features

- **Safe Editing**: Uses Unity's `PrefabUtility.EditPrefabContentsScope` to modify prefabs without needing to instantiate them into a scene.
- **Detection**: Identifies materials with `null` shaders or shaders marked as "InternalError" (the common cause of pink meshes).
- **Automatic Replacement**: Replaces broken shaders with the default Unity **Standard** shader.
- **Recursive Scan**: Deeply scans every child Renderer and every material slot within the prefab.

## How to Use

1. Locate a "pink" or broken Prefab in your **Project** window.
2. Right-click the Prefab asset.
3. Select **Fix Missing Shaders (Prefab → Standard)**.
4. The console will log exactly which materials were fixed.

> [!NOTE]
> This tool is specifically designed to work on **Prefab Assets** in the Project view, not GameObject instances in the Hierarchy.
