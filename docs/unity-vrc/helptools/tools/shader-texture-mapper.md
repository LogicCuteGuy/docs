---
sidebar_position: 8
---

# Shader Texture Mapper

**Menu Path**: `Window > LogicCuteGuy > Shader Texture Mapper`

A professional-grade utility for switching shaders across multiple materials while preserving and re-mapping texture assignments. This is essential when migrating assets between different shaders (e.g., from Standard to a custom Toon shader).

## Features

- **Mapping Presets**: Map specific property names from the old shader to the new one (e.g., `_MainTex` → `_BaseMap`).
- **Auto-Detection**: The tool can automatically detect common texture properties and suggest mappings based on name similarity.
- **Project-Wide Scan**: Scan your entire project to find all materials currently using a specific "Old Shader".
- **Batch Processing**: Apply replacements to selected Materials or recursively to all materials found on selected GameObjects.
- **Texture Integrity**: Ensures that textures are correctly transferred even if the target shader has different internal variable names.

## How to Use

1. Assign the **Old Shader** and **New Shader**.
2. Click **Auto-Detect Common Properties** or manually add mappings.
3. Click **Scan Project for Old Shader** to find candidates, or select materials in the project.
4. Click **Apply Shader Replacement to Selection**.

> [!TIP]
> Use the **Scan Results** foldout to quickly "Select All in Project" for a specific shader, allowing you to update your entire project's look in seconds.
