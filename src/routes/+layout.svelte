<script>
  import "../app.scss";
  import Header from "./component/Header.svelte";
  import Footer from "./component/Footer.svelte";
  import OverlayLoading from "./component/OverlayLoading.svelte";
  import { modalActive, apiLoading, presetActive } from "./helper/store.js";
  import ModalFactory from "./modal/ModalFactory.svelte";
  import Page from "./Page.svelte";
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import { fcAllGet } from "./helper/api.js";

  $apiLoading = true;
  /** @type {import('./$types').LayoutData} */
  export let data;

  if (typeof data == "object") {
    $apiLoading = false;
    $presetActive = data.configDevice.pre;
  }

  const toastOptions = {
    duration: 4000,       // duration of progress bar tween to the `next` value
    initial: 1,           // initial progress bar value
    next: 0,              // next progress value
    pausable: true,       // pause progress bar tween on mouse hover
    intro: { y: 192 },    // toast intro fly animation settings
    reversed: true
  };

  async function fcAllReload() {
    data.fcAll = await fcAllGet(fetch);

    return true
  }
</script>

<div class="container">
  <Header />
  {#await data}
    <!-- promise is pending -->
    <p>Waiting for the data to load...</p>
  {:then value}
    <!-- promise was fulfilled -->
    <Page bind:data={data} />

    <Footer bind:configDevice={data.configDevice} />
    {#if $modalActive }
      <ModalFactory bind:modalActive={$modalActive} bind:data={data} on:reloadFcAll={fcAllReload} />
    {/if}
    {#if $apiLoading}
      <OverlayLoading />
    {/if}
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
  <slot />
  <SvelteToast options="{toastOptions}" />
</div>

<style>

</style>
