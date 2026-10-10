---
sidebar_position: 1
slug: /
---

# LogicCuteGuy VRC/Unity

<div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
  <img src="/img/icon.png" alt="LogicCuteGuy avatar" style={{borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', border: '4px solid var(--ifm-color-primary)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'}} />
</div>

Welcome to the central repository for **LogicCuteGuy** Unity and VRChat development tools. We provide a suite of utilities designed to enhance workflows, optimize performance, and simplify world-building.

<div style={{padding: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', background: 'var(--glass-bg)', borderRadius: '2rem', border: '1px solid var(--glass-border)', margin: '2rem 0'}}>
  <h2 style={{margin: 0, fontSize: '1.8rem', fontWeight: 800}}>Quick Installation</h2>
  <p style={{opacity: 0.8, textAlign: 'center', maxWidth: '500px'}}>Add our repository to your VRChat Creator Companion to access and update all our tools with one click.</p>
  
  <a href="vcc://vpm/addRepo?url=https://vpm.logiccuteguy.com/index.json" className="button--vcc" style={{fontSize: '1.2rem', padding: '16px 36px'}}>
    <span>Install via VCC</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
  </a>
  
  <span style={{fontSize: '0.9rem', opacity: 0.6}}>Supports Unity 2022.3.x & VCC</span>
</div>

[Get a square VCC embed for BOOTH](/booth-embed).

## Available Projects

All three packages are published in the [LogicCuteGuy VPM Listing](./packages.md) (`https://vpm.logiccuteguy.com/index.json`). DigHoleIt also publishes a Git tag and named GitHub Release package.

### [Help Tools](./helptools/intro.md) — `com.logiccuteguy.helptools` v1.0.1
A collection of 15+ professional editor utilities for lightmap scaling, asset analysis, shader mapping, and hierarchical organization.

### [LCGUdonSharp](./lcgudonsharp/intro.md) — `com.logiccuteguy.lcgudonsharp` v0.3.10

LCGUdonSharp 0.3.10 installs an embedded **SBP compatibility 1.21.26** dependency through VPM before Unity compiles, preventing the VRChat SDK `ExtensionMethods` collision on fresh installs and upgrades. It is based on Unity SBP 1.21.25, preserves upstream source/GUIDs and the Unity Companion License, and survives `Library` regeneration. Unity Localization 1.4.5 remains supported. See [installation](./lcgudonsharp/install.md); manual installs require **both** release ZIPs.

LCGUdonSharp 0.3.9 adds [text and asset localization](./lcgudonsharp/localization.md): Unity String/Asset Tables baked into Udon, local language selection and fallbacks, dropdowns/callbacks, validated Smart Strings, and sprite/texture/audio/prefab variants. It also adds EN/TH/JA samples, legacy JSON tools, Unity Localization 1.4.5 and Scriptable Build Pipeline 1.21.25 dependencies, and build/worker-thread compatibility fixes. Rebuild the world after editing tables or updating.

LCGUdonSharp 0.3.8 adds nested and polymorphic [ScriptableObject data snapshots](./lcgudonsharp/scriptableobjects.md), runtime type tests and checked casts, cycle/depth validation, and a local equipment example. Rebuild all Udon programs and rebake scene/prefab data after updating because snapshot layouts now include runtime type tags.

An interface-enabled UdonSharp compiler for VRChat — C# interfaces, build-time async/await, synchronous try/catch/finally, lowered collections/JSON, extended language features, and manual packet networking with bounded object-motion batching and zone recovery.

### [DigHoleIt](./digholeit/intro.md) — `com.logiccuteguy.digholeit` v0.7.0

DigHoleIt 0.7.0 adds Dig Pen prefabs, runtime tree/detail planting and erasing (including baked foliage), networked smoothing, a VRChat showcase, and Refresh Holes / Refresh Zones. Settings are local; VRChat edits are synchronized and replayed for late joiners.

Version 0.7.0 is available through VPM and GitHub. See [installation](./digholeit/getting-started.md).
Diggable voxel terrain for Unity: runtime holes, tunnels, caves, soil and terrain-layer painting, with synchronized VRChat edits and a separate standalone C# runtime.

See the [full package list](./packages.md) for versions, dependencies, and repositories.

---

## Support & Community
- **GitHub**: [LogicCuteGuy Repository](https://github.com/LogicCuteGuy)
- **Updates**: Follow us for the latest tool releases and performance optimizations.
