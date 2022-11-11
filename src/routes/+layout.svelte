<script>
  import "../app.scss";
  import Header from "./module/Header.svelte";
  import Footer from "./module/Footer.svelte";
  import DeviceConfig from './modal/ModalConfigDevice.svelte';
  import Preset from './modal/ModalPreset.svelte';
  import OverlayLoading from "./module/OverlayLoading.svelte";
  import { activeModal } from "./helper/store.js";
  import { modal } from "./helper/constants.js";

  let apiLoading = true;
  /** @type {import('./$types').LayoutData} */
  export let data;

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
    {#if $activeModal === modal.configDevice }
      <DeviceConfig bind:configDevice={data.configDevice} bind:configWifi={data.configWifi} />
    {/if}
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
