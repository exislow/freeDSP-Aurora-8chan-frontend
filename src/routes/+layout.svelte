<script>
  import "../app.scss";
  import Header from "./component/Header.svelte";
  import Footer from "./component/Footer.svelte";
  import OverlayLoading from "./component/OverlayLoading.svelte";
  import { modalActive, apiLoading } from "./helper/store.js";
  import ModalFactory from "./modal/ModalFactory.svelte";
  import Page from "./Page.svelte";

  $apiLoading = true;
  /** @type {import('./$types').LayoutData} */
  export let data;

  if (typeof data == "object") {
    $apiLoading = false;
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
      <ModalFactory bind:modalActive={$modalActive} bind:data={data}/>
    {/if}
    {#if $apiLoading}
      <OverlayLoading />
    {/if}
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
  <slot />
</div>

<style>

</style>
