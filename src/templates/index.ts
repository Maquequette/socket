import { ASTRO_TEMPLATE } from "./node/Astro";
import { NEXTJS_TEMPLATE } from "./node/Next";
import { NODE_TEMPLATE } from "./node/Node";
import { VITE_TEMPLATE } from "./node/Vite";
import { VITE_REACT_TEMPLATE } from "./node/Vite-React";
import { VITE_REACT_TS_TEMPLATE } from "./node/Vite-React-Typescript";
import { VITE_SVELTE_TEMPLATE } from "./node/Vite-Svelte";
import { VITE_SVELTE_TS_TEMPLATE } from "./node/Vite-Svelte-Typescript";
import { VITE_VUE_TEMPLATE } from "./node/Vite-Vue";
import { VITE_VUE_TS_TEMPLATE } from "./node/Vite-Vue-Typescript";
import { ANGULAR_TEMPLATE } from "./runtime/Angular";
import { REACT_TEMPLATE } from "./runtime/React";
import { REACT_TYPESCRIPT_TEMPLATE } from "./runtime/React-Typescript";
import { SOLID_TEMPLATE } from "./runtime/Solid";
import { SVELTE_TEMPLATE } from "./runtime/Svelte";
import { TEST_TYPESCRIPT_TEMPLATE } from "./runtime/Test-Typescript";
import { VANILLA_TEMPLATE } from "./runtime/Vanilla";
import { VANILLA_TYPESCRIPT_TEMPLATE } from "./runtime/Vanilla-Typescript";
import { VUE_TEMPLATE } from "./runtime/Vue";
import { VUE_TS_TEMPLATE } from "./runtime/Vue-Typescript";
import { STATIC_TEMPLATE } from "./Static";
export { ASTRO_TEMPLATE } from "./node/Astro";
export { ANGULAR_TEMPLATE } from "./runtime/Angular";
export { REACT_TEMPLATE } from "./runtime/React";
export { REACT_TYPESCRIPT_TEMPLATE } from "./runtime/React-Typescript";
export { SOLID_TEMPLATE } from "./runtime/Solid";
export { SVELTE_TEMPLATE } from "./runtime/Svelte";
export { TEST_TYPESCRIPT_TEMPLATE } from "./runtime/Test-Typescript";
export { VANILLA_TEMPLATE } from "./runtime/Vanilla";
export { VANILLA_TYPESCRIPT_TEMPLATE } from "./runtime/Vanilla-Typescript";
export { VUE_TEMPLATE } from "./runtime/Vue";

export const SANDBOX_TEMPLATES: any = {
  static: STATIC_TEMPLATE,
  angular: ANGULAR_TEMPLATE,
  react: REACT_TEMPLATE,
  "react-ts": REACT_TYPESCRIPT_TEMPLATE,
  solid: SOLID_TEMPLATE,
  svelte: SVELTE_TEMPLATE,
  "test-ts": TEST_TYPESCRIPT_TEMPLATE,
  "vanilla-ts": VANILLA_TYPESCRIPT_TEMPLATE,
  vanilla: VANILLA_TEMPLATE,
  vue: VUE_TEMPLATE,
  "vue-ts": VUE_TS_TEMPLATE,

  node: NODE_TEMPLATE,
  nextjs: NEXTJS_TEMPLATE,
  vite: VITE_TEMPLATE,
  "vite-react": VITE_REACT_TEMPLATE,
  "vite-react-ts": VITE_REACT_TS_TEMPLATE,
  "vite-vue": VITE_VUE_TEMPLATE,
  "vite-vue-ts": VITE_VUE_TS_TEMPLATE,
  "vite-svelte": VITE_SVELTE_TEMPLATE,
  "vite-svelte-ts": VITE_SVELTE_TS_TEMPLATE,
  astro: ASTRO_TEMPLATE,
};
