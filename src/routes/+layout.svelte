<script>
  import "../app.scss";
  import Header from "./module/Header.svelte";
  import Footer from "./module/Footer.svelte";
  import DeviceConfig from './modal/ModalConfigDevice.svelte';
  import Preset from './modal/ModalPreset.svelte';
  import { onMount } from "svelte";
  import { closeAllModals, closeModal } from "./helper/modal.js";
  import OverlayLoading from "./module/OverlayLoading.svelte";

  let apiLoading = true;
  /** @type {import('./$types').LayoutData} */
  export let data;

  onMount(async function () {
    // Modal Click Events
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach((close) => {
      const target = close.closest('.modal');

      close.addEventListener('click', () => {
        const event = new CustomEvent(target.id, {
          isActive: false
        });

        document.dispatchEvent(event);
        closeModal(target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });

  $: {
    apiLoading = typeof data == "object" ? false : true
  }
</script>

<div class="container">
  <Header />

  {#await data}
    <!-- promise is pending -->
    <p>Waiting for the data to load...</p>
  {:then value}
    <!-- promise was fulfilled -->
    <slot />
    <DeviceConfig bind:configDevice={data.configDevice} bind:configWifi={data.configWifi} />
    <Footer bind:configDevice={data.configDevice} />
    <Preset />
    <OverlayLoading bind:apiLoading />
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>

<style>

</style>
