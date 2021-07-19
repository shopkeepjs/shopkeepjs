<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let expanded;
  export let direction;
</script>

<div class="chevron-container" on:click={() => dispatch('expand')}>
  {#if expanded}
    <svg xmlns="http://www.w3.org/2000/svg" class="chevron" viewBox="0 0 20 20">
      <title>A chevron pointed down indicating expanded chapter notes.</title>
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  {:else if direction === 'right'}
    <svg xmlns="http://www.w3.org/2000/svg" class="chevron" viewBox="0 0 20 20">
      <title>A chevron pointed right indicating collapsed chapter notes.</title>
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  {:else if direction === 'left'}
    <svg xmlns="http://www.w3.org/2000/svg" class="chevron" viewBox="0 0 20 20">
      <title>A chevron pointed left indicating collapsed chapter notes.</title>
      <path
        fill-rule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  {/if}
</div>

<style>
  .chevron-container {
    margin-right: 0.2rem;
    fill: var(--clr-main-lightText);
    cursor: pointer;
    height: 2rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .chevron {
    height: 2rem;
  }
</style>
