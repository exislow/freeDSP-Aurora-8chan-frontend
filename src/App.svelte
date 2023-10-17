<script>
  import "./app.scss";
  import Header from "./component/Header.svelte";
  import Footer from "./component/Footer.svelte";
  import OverlayLoading from "./component/OverlayLoading.svelte";
  import { modalActive, apiLoading, presetActive } from "./helper/store.js";
  import ModalFactory from "./modal/ModalFactory.svelte";
  import Page from "./Page.svelte";
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import {
    audioInputGet,
    bypassAllGet, channelNamesGet,
    configAddonGet,
    configDeviceGet, configWifiGet,
    fcAllGet,
    spdifOutGet,
    volumeMasterGet
  } from "./helper/api.js";
  import { onMount } from "svelte";

  export let data;

  onMount(async () => {
    $apiLoading = true;
    data = await load({ fetch });

    if (typeof data == "object") {
      $apiLoading = false;
      $presetActive = data.configDevice.pre;
    }
  })

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

  export async function load({ fetch }) {
    return {
      configDevice: await configDeviceGet(fetch),
      addonInput: await configAddonGet(fetch),
      spdifOut: await spdifOutGet(fetch),
      audioInput: await audioInputGet(fetch),
      bypassAll: await bypassAllGet(fetch),
      fcAll: await fcAllGet(fetch),
      volumeMaster: await volumeMasterGet(fetch),
      channelNames: await channelNamesGet(fetch),
      configWifi: await configWifiGet(fetch)
    };
  }
</script>

<div class="container">
  <Header />
  {#if $apiLoading}
    <OverlayLoading />
  {/if}
  {#if data === undefined}
    <!-- promise is pending -->
    <p>Waiting for the data to load...</p>
  {:else}
    <!-- promise was fulfilled -->
    <Page bind:data={data} />

    <Footer bind:configDevice={data.configDevice} />
    {#if $modalActive }
      <ModalFactory bind:modalActive={$modalActive} bind:data={data} on:reloadFcAll={fcAllReload} />
    {/if}
  {/if}
  <slot />
  <SvelteToast options="{toastOptions}" />
</div>
