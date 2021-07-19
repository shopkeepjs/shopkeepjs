<script>
 export let isPinned;

  function doThePin(){
    
  }
</script>

<div on:click|stopPropagation={() => doThePin()} class="lock-container">
  {#if isPinned}
    <svg xmlns="http://www.w3.org/2000/svg" class="locked icon" viewBox="0 0 20 20">
      <title>A locked button indicating this book has been pinned.</title>
      <path
        fill-rule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clip-rule="evenodd"
      />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="unlocked" viewBox="0 0 20 20">
      <title>An unlocked button for pinning a book to the top.</title>
      <path
        d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
      />
    </svg>
  {/if}
</div>

<style>
  .lock-container {
    position: absolute;
    right: -6px;
    top: -5px;
    height: 1.2rem;
    width: 1.2rem;
    padding: 1rem 0.5rem 0rem 0rem;
    z-index: 99;
  }
  .lock-container:hover {
    filter: contrast(200%);
  }
  .unlocked {
    fill: var(--clr-sidebar-unlocked);
  }
  .locked {
    fill: var(--clr-sidebar-locked);
  }
  .icon:hover {
    filter: drop-shadow(0px 0px 0px 5px #41414156);
    -webkit-filter: drop-shadow(0px 0px 3px #1a1a1a7e);
  }
</style>
