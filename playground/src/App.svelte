<script lang="ts">
  import { onMount } from "svelte";
  import World from "../../src/core/world/World";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
      alert("WebGL2 context couldn't load");
      return;
    }
    new World(gl).start();
  });
</script>

<canvas id="main-app" bind:this={canvas} width={1280} height={720}></canvas>
