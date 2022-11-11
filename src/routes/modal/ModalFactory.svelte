<script>
  import { modal } from "../helper/constants.js";
  import { modalClose } from "../helper/modal.js";
  import { handleKeydown} from "../helper/modal.js";
  import { onDestroy } from "svelte";
  import ModalConfigDevice from "./ModalConfigDevice.svelte";
  import ModalPreset from "./ModalPreset.svelte";

  export let activeModal;
  export let configDevice;
  export let configWifi;
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

  const modalObj = getModalObj(modal, activeModal);
</script>

<svelte:window on:keydown={(event) => handleKeydown(thisModal, event)}/>

<div class="modal is-active" id="{modalObj.id}" aria-modal="true" bind:this={thisModal}>
  <div class="modal-background" on:click={modalClose} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{modalObj.name}</p>
      <button aria-label="close" class="delete" on:click={modalClose} />
    </header>

    <section class="modal-card-body">
      {#if activeModal === modal.configDevice.id }
        <ModalConfigDevice bind:configDevice={configDevice} bind:configWifi={configWifi} />
      {:else if activeModal === modal.preset.id}
        <ModalPreset />
      {/if}
    </section>
  </div>
</div>
