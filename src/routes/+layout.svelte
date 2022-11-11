<script>
  import "../app.scss";
  import Header from "./module/Header.svelte";
  import Footer from "./module/Footer.svelte";
  import OverlayLoading from "./module/OverlayLoading.svelte";
  import { activeModal, apiLoading } from "./helper/store.js";
  import ModalFactory from "./modal/ModalFactory.svelte";

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: {
    $apiLoading = typeof data == "object" ? false : true
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

    <Footer bind:configDevice={data.configDevice} />
    {#if $activeModal }
      <ModalFactory bind:activeModal={$activeModal} bind:configDevice={data.configDevice} bind:configWifi={data.configWifi} />
    {/if}
    <OverlayLoading bind:apiLoading={$apiLoading} />
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>

<style>

</style>
