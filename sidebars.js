// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  unityVrcSidebar: [
    'unity-vrc/landing',
    {
      type: 'category',
      label: 'Help Tools',
      collapsed: false,
      items: [
        'unity-vrc/helptools/intro',
        'unity-vrc/helptools/install',
        'unity-vrc/helptools/tools/auto-scale-lightmap',
        'unity-vrc/helptools/tools/switch-child-lightmap',
        'unity-vrc/helptools/tools/fix-missing-shaders',
        'unity-vrc/helptools/tools/sort-children',
        'unity-vrc/helptools/tools/rename-increment',
        'unity-vrc/helptools/tools/paste-as-child',
        'unity-vrc/helptools/tools/select-by-pattern',
        'unity-vrc/helptools/tools/shader-texture-mapper',
        'unity-vrc/helptools/tools/replace-child-materials',
        'unity-vrc/helptools/tools/random-spawn-navmesh',
        'unity-vrc/helptools/tools/random-rotate-children',
        'unity-vrc/helptools/tools/terrain-swap',
        'unity-vrc/helptools/tools/check-asset-usage',
        'unity-vrc/helptools/tools/remap-references',
      ],
    },
  ],
};

export default sidebars;
