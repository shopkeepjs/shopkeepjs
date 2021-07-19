import { quartOut } from "svelte/easing";

export function bgFade(node, params) {
  return {
    delay: params.delay || 0,
    duration: params.duration || 500,
    easing: params.easing || quartOut,
    css: (t, u) => `background-color: hsl(0, 0%, 25%, ${t}); box-shadow:none;`,
  };
}
