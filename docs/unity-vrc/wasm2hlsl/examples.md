---
sidebar_position: 4
---

# Examples

The examples are in the package's `Example/` folder, with `Showcase.unity` as the demo scene. Each folder has the Rust source, the built `.wasm`, an UdonSharp script and a README.

| Example | Shows | Techniques |
|---|---|---|
| **Mandelbrot** | Fractal images with a synced view | A 64 KB palette as constant data |
| **Juno6** | A playable polyphonic synthesizer | Audio rendering, MIDI, network events |
| **AudioDsp** | An audio filter effect | FIR filtering on the GPU |
| **DeepZoom** | A deep Mandelbrot zoom | `f64`, bands, readback off |
| **SimdPlasma** | An animated plasma | `v128` SIMD, readback off |
| **Chroma** | A live musical-scale filter | Real-time audio processing |

DeepZoom and SimdPlasma can be added with **Tools > WASM2HLSL > Add f64 + SIMD Examples To Scene**. Save the scene afterwards.

## Mandelbrot

The main image and the Julia set are 256 × 256 each. The view index is synced, and **Interact** moves to the next view.

## Juno6

A synthesizer with 12 voices that plays notes C2 to C5. It accepts MIDI through `VRCMidiListener` (start VRChat with `--midi=<device>`). Panel values are synced, and notes are sent as network events.

For each key it renders 3 seconds of 32 kHz stereo audio, about 2.3 million values, in 30 to 90 ms. It plays seconds 0 to 2 once, then loops seconds 2 to 3. Because each pixel is computed independently, the filter is rebuilt for every sample by running it again over the previous 256 samples.

## AudioDsp

Processes a sweep of 98,304 samples (a 512 × 192 texture) with a 65-tap FIR filter whose cutoff moves from 200 Hz to 8 kHz every 2 seconds. **Interact** cycles between off, dry and sweep. The choice is synced.

## DeepZoom

A 256 × 256 zoom in `f64` that doubles 32 times. With `f32` it would break down after about 17. With 8 bands it costs about 3.5 ms per frame, or about 27 ms for a full image.

:::note
This shader takes about a minute to compile.
:::

The results match Node.js. It is displayed with `WASM2HLSL/Int Display` in **Iteration Palette** mode.

## SimdPlasma

Plasma computed with SIMD, displayed in **Packed RGBA8** mode. It compiles in under a second, and its colour values are within 1 of the reference per byte.

## Chroma

Filters live audio to the notes of a musical scale. The panel has **Color** (0 to 200), **Key**, **Scale** (5 choices), a quality switch (HQ has 43 ms latency, LOW has 21 ms) and **Bypass**. It uses about 0.7 ms of GPU time per audio block, with 50 to 80 ms of buffering.

:::note
The Chroma README mentions **Add Chroma Chain To Scene**. That menu belongs to the author's own project and **isn't included in the package**.
:::

## Rebuilding

The examples are built with a 1 KB stack (`-zstack-size=1024`). See each folder's README for the command, and [Getting started](./getting-started.md) for the general build flags.

Timings on this page come from the package's example READMEs. Your GPU will give different numbers.
