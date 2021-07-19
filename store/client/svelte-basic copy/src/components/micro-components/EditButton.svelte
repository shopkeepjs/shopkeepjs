<script>
  function doTheEdit() {

  }
</script>

<div on:click|stopPropagation={() => doTheEdit()} class="edit-button">
  {#if !$editable}
    <svg xmlns="http://www.w3.org/2000/svg" class="svg edit" viewBox="0 0 20 20" fill="currentColor">
      <title>A chapter edit button.</title>
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path
        fillRule="evenodd"
        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
        clipRule="evenodd"
      />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="svg save" viewBox="0 0 20 20" fill="currentColor">
      <title>A chapter save edits button.</title>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  {/if}
</div>

<style>
  .edit-button {
    right: 0%;
    position: absolute;
    display: flex;
    align-items: center;
    margin-right: 1.7rem;
  }
  .svg {
    height: 1.5rem;
    cursor: pointer;
  }
  .svg:hover {
    filter: drop-shadow(0px 0px 3px 4px #d4d4d456), brightness(150%);
    -webkit-filter: drop-shadow(0px 0px 5px #d4d4d456);
  }
  .edit {
    fill: rgba(221, 221, 221, 0.411);
  }
  .save {
    fill: rgb(0, 151, 0);
  }
</style>
