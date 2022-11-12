<script>
  import { modal } from "../helper/constants.js";
  import { modalClose } from "../helper/modal.js";
  import { handleKeydown} from "../helper/modal.js";
  import { onDestroy } from "svelte";
  import ModalConfigDevice from "./ModalConfigDevice.svelte";
  import ModalPreset from "./ModalPreset.svelte";
  import ModalChartGeneric from "./ModalChartGeneric.svelte";
  import { filterActive } from "../helper/store.js";
  import { soundProcessor } from "../helper/constants";

  export let data;
  export let modalActive;
  let thisModal;
  const previouslyFocused = typeof document !== 'undefined' && document.activeElement;

  if (previouslyFocused) {
    onDestroy(() => {
      previouslyFocused.focus();
    });
  }

  function getModalObj(modals, idValue) {
    const [ id, modal ] = Object.entries(modals).find(function([ id, modal ]) {

      return modal.id === idValue;
    })

    return modal
  }

  const modalObj = getModalObj(modal, modalActive);
</script>

<svelte:window on:keydown={(event) => handleKeydown(thisModal, event)}/>

<div class="modal is-active" id="{modalObj.id}" aria-modal="true" bind:this={thisModal}>
  <div class="modal-background" on:click={modalClose} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {#if modalActive === modal.chartGeneric.id}
          {soundProcessor.soundBlocks[$filterActive.id].name.long} for Channel {$filterActive.channelNumber + 1}
        {:else}
          {modalObj.name}
        {/if}
      </p>
      <button aria-label="close" class="delete" on:click={modalClose} />
    </header>

    <section class="modal-card-body">
      {#if modalActive === modal.configDevice.id }
        <ModalConfigDevice bind:configDevice={data.configDevice} bind:configWifi={data.configWifi} />
      {:else if modalActive === modal.preset.id}
        <ModalPreset />
      {:else if modalActive === modal.chartGeneric.id}
        <ModalChartGeneric filter={filterActive} />
      {/if}
    </section>
  </div>
</div>
