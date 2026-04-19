---
sidebar_position: 11
---

# Check Asset Usage In Scene

**Menu Path**: `Right-click Asset/Folder > Check Usage in Scene`

An advanced analysis tool that scans your currently open scene to identify which asset files are being used and which are redundant.

## Features

- **Comprehensive Search**: Scans every GameObject and every component's `SerializedProperty` for object references matching your selection.
- **Hierarchical Tree View**: Displays results in a folder-based tree structure, mirroring your Project window.
- **Aggregated Stats**: Folders show summarized data: Total Files, Used vs. Unused count, and cumulative file size.
- **Filtering & Search**:
    - **Show Only Unused**: Instantly identify dead weight in your project.
    - **Live Filter**: Search for specific files within the results.
- **Interactive Results**: Click any result to "Ping" the asset in the Project view, or expand a used asset to see exactly which GameObjects are referencing it.
- **Sortable Columns**: Sort by Name, Usage status, or File size to find the biggest optimization wins.

> [!TIP]
> Use this tool before publishing a VRChat world to find heavy textures or meshes that are included in the project but not actually performing any function in the scene.
