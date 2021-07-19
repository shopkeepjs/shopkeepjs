<script>
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  export let listToSort = [
    { value: 1, id: 1 },
    { value: 2, id: 2 },
    { value: 3, id: 3 },
    { value: 4, id: 4 },
    { value: 5, id: 5 },
  ];

  let isOver = false;
  // TODO - Explore the capabilities of adding touch to this
  const getDraggedParent = (node) =>
    node.dataset && node.dataset.index ? node.dataset : getDraggedParent(node.parentNode);
  const start = (ev) => {
    let dragged = getDraggedParent(ev.target);
    ev.dataTransfer.setData('source', dragged.index);
  };
  const over = (ev) => {
    ev.preventDefault();
    let dragged = getDraggedParent(ev.target);
    if (isOver !== dragged.id) isOver = JSON.parse(dragged.id);
  };
  const leave = (ev) => {
    let dragged = getDraggedParent(ev.target);
    if (isOver === dragged.id) isOver = false;
  };
  const drop = (ev) => {
    isOver = false;
    ev.preventDefault();
    let dragged = getDraggedParent(ev.target);
    let from = ev.dataTransfer.getData('source');
    let to = dragged.index;
    reorder({ from, to });
  };
  const reorder = ({ from, to }) => {
    let newList = listToSort;
    newList[from] = [newList[to], (newList[to] = newList[from])][0];
    // NOTE - This is where you apply the new order - whether to a store, the original list or whatever
    // ex: store.replace(newList)
    listToSort = newList;
  };
</script>

{#each listToSort as item, index (item.id)}
  <div
    class="draggable-container"
    on:dragover={over}
    on:dragleave={leave}
    on:drop={drop}
    animate:flip={{ duration: 500 }}
    data-index={index}
    data-id={JSON.stringify(item.id)}
    class:over={item.id === isOver}
  >
    <div
      draggable={true}
      on:dragstart={start}
      on:dragover={over}
      on:dragleave={leave}
      on:drop={drop}
      transition:fly={{ x: 40, duration: 500 }}
      class="dots-container"
    >
      <svg transition:fade={{ duration: 150 }} xmlns="http://www.w3.org/2000/svg" class="dots" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </div>
    <div class="item">{item}</div>
  </div>
{/each}

<style>
  .draggable-container {
    position: relative;
  }
  .over {
    margin-left: 1rem;
    filter: brightness(70%);
  }
  .dots-container {
    position: absolute;
    left: -2rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .dots {
    fill: hsl(180, 19%, 20%);
    stroke: hsl(180, 19%, 20%);
    stroke-width: 2px;
    height: 2.5rem;
    cursor: pointer;
    z-index: 1;
  }
  .dots:hover {
    filter: brightness(150%);
  }
  .item {
    width: 100px;
    height: 25px;
    background-color: pink;
    color: brown;
  }
</style>
