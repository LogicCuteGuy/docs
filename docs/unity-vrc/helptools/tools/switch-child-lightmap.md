---
sidebar_position: 2
---

# Switch Child Lightmap Mode

**Menu Path**: `Right-click MeshRenderer > LogicCuteGuy > Switch Child Lightmap Mode...`

This utility allows for rapid high-level lighting strategy changes. You can instantly toggle a large hierarchy between using baked lightmaps or relying on light probes.

## Features

- **Mode Switching**: Toggle between `Lightmap` (Baked) and `Light Probes` (Realtime/Probe Lit).
- **Static Flag Automation**: Automatically enables/disables the `Contribute GI` static flag on GameObjects to match the chosen lighting mode.
- **Unified Property Control**: Sets `receiveGI` to either `Lightmaps` or `LightProbes` and toggles `lightProbeUsage`.
- **Lightmap Scale Control**: Optional override to set the `Scale In Lightmap` property during the switch (e.g., set to 1.0 when lightmapping, and 0.0 when probe-lit to save atlas space).
- **Recursive Processing**: Apply to selected objects only, or recursively to all children (including inactive ones if toggled).

## How to Use

1. Right-click any **MeshRenderer** in the Hierarchy or open from the **LogicCuteGuy** menu.
2. Select your target **Lighting Mode**.
3. (Optional) Check **Set Scale In Lightmap** to enforce specific densities during the switch.
4. Click **Apply To Target Or Selected**.

> [!IMPORTANT]
> This tool modifies `StaticEditorFlags`. Ensure you are in a state where modifying static flags is safe for your scene architecture.
