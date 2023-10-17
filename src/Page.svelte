<script>
  import { bypassSet, extractFc, isBypassActive, range } from "./helper/range.js";
  import ConfigSpdif from "./component/ConfigSpdif.svelte";
  import { configPreset, configSite, modal, soundProcessor, configChannelSource } from "./helper/constants.js";
  import { filterActive, presetActive, apiLoading } from "./helper/store.js";
  import { modalOpen } from "./helper/modal.js";
  import {
    configAddonGet,
    audioInputGet,
    bypassAllGet,
    configDeviceGet, fcAllGet,
    presetSwitchPost, presetStorePost,
    spdifOutGet, volumeMasterGet, volumeMasterPost
  } from "./helper/api.js";
  import { toastErrorHttp, toastSuccess } from "./helper/toast.js";

  export let data;
  let thisMuteButton = {};
  let volumeMaster = data.volumeMaster.vol;

  const state = {
    volumeMaster: volumeMaster,
    input: {
      0: data.audioInput.in0,
      1: data.audioInput.in1,
      2: data.audioInput.in2,
      3: data.audioInput.in3,
      4: data.audioInput.in4,
      5: data.audioInput.in5,
      6: data.audioInput.in6,
      7: data.audioInput.in7
    }
  };

  function activateModalChart(target, filterId, channelNumber, channelName) {
    $filterActive.id = filterId;
    $filterActive.channelNumber = channelNumber;
    $filterActive.channelName = channelName;

    modalOpen(target);
  }

  async function updateVolumeMaster() {
    $apiLoading = true;
    const response = await volumeMasterPost(state.volumeMaster);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess("Volume set.");
      volumeMaster = state.volumeMaster;
    } else {
      toastErrorHttp(response);
      state.volumeMaster = volumeMaster;
    }
  }

  async function presetSwitch(presetId) {
    $apiLoading = true;
    const response = await presetSwitchPost(presetId);

    if (response.ok) {
      $presetActive = presetId;
      const dataReloadState = await dataReload();

      toastSuccess(`Preset switched to <strong>${data.channelNames.presets[presetId] || 'Preset ' + presetId}</strong>.`);
    } else {
      toastErrorHttp(response);
    }

    $apiLoading = false;
  }

  async function dataReload() {
    data.configDevice = await configDeviceGet(fetch);
    data.addonInput = await configAddonGet(fetch);
    data.spdifOut = await spdifOutGet(fetch);
    data.audioInput = await audioInputGet(fetch);
    data.bypassAll = await bypassAllGet(fetch);
    data.fcAll = await fcAllGet(fetch);
    data.volumeMaster = await volumeMasterGet(fetch);

    state.volumeMaster = data.volumeMaster.vol;

    return true
  }

  async function muteToggle(channelId, bypassId, bypassAll, apis) {
    $apiLoading = true;
    const dataChannel = await apis.get(channelId);
    let isBypass = "0";

    if (channelId == "gain") {
      isBypass = dataChannel.mute = dataChannel.mute == "0" ? "1" : "0";
    } else {
      if (soundProcessor.soundBlocks.peqbank.idPrefix + channelId == bypassId) {
        // Check aggregated bypass state (only for PEQ Bank) and decide using this value how to toggle.
        const bypassValueCurrent = isBypassActive(bypassId, bypassAll);
        const bypassValueNew = new Array(dataChannel.numbands);
        dataChannel.bypass = bypassValueCurrent == "0" ? bypassValueNew.fill("1") : bypassValueNew.fill("0");
        isBypass = bypassValueCurrent == "0" ? "1" : "0";
      } else {
        isBypass = dataChannel.bypass = dataChannel.bypass == "0" ? "1" : "0";
      }
    }

    const response = await apis.post(channelId, dataChannel);
    $apiLoading = false;

    if (response.ok) {
      let notifyString = "";
      const muteElemClassList = thisMuteButton[bypassId].classList;

      if (isBypass == "1") {
        notifyString = "activated";
        muteElemClassList.remove("is-outlined");
      } else {
        notifyString = "deactivated";
        muteElemClassList.add("is-outlined");
      }

      toastSuccess(`Bypass ${notifyString}.`);
      bypassSet(bypassId, bypassAll, isBypass);
    } else {
      toastErrorHttp(response);
    }
  }

  async function presetStore() {
    $apiLoading = true;
    const response = await presetStorePost();

    if (response.ok) {
      toastSuccess("Preset has been stored!");
    } else {
      toastErrorHttp(response);
    }

    $apiLoading = false;
  }
  </script>

<svelte:head>
  <title>8 Channel | freeDSP Aurora</title>
  <meta content="8 Channel | freeDSP Aurora" name="description" />
</svelte:head>

<div class="card">
  <div class="card-content">
    <div class="content">
      <!-- Input generator -->
      {#each range(0, soundProcessor.countChannel, 1) as num (num)}
        <div class="columns is-variable is-1 mb-0 is-vcentered">
          <div class="column is-fullwidth">
            <div class="field">
              <label class="label label-narrow" for="channel-source-{num}">{data.channelNames.inputs[num]}</label>
              <div class="control">
                <div class="select">
                  <select bind:value={ state.input[num] } id="channel-source-{num}">
                    {#each Object.entries(configChannelSource) as [id, name] (id)}
                      <option value="{id}">{name}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Sound blocks generator --->
          {#each Object.entries(soundProcessor.soundBlocks) as [name, definition], index (name)}
            {@const idSoundBlock = definition.idPrefix + num}
            <div class="column">
              <div class="field has-addons">
                <button
                  class="button min-width-audio-block is-fullwidth {definition.color} js-modal-trigger is-multiline"
                  data-target="{modal.chartGeneric.id}"
                  on:click={() => activateModalChart(modal.chartGeneric.id, name, num, data.channelNames.inputs[num])}>
                  <span>
                    <span class="has-text-weight-bold">{definition.name.short}</span><br />
                    <span class="is-size-7 is-family-code">{extractFc(definition.idPrefix + num, data.fcAll.fc)}</span>
                  </span>
                </button>

                {#if name !== 'phase'}
                  {@const isOutline = isBypassActive(definition.idPrefix + num, data.bypassAll.byp) === 0}
                  <button bind:this={thisMuteButton[idSoundBlock]} id="{`${idSoundBlock}Mute`}" class="button is-danger is-multiline"
                          class:is-outlined={isOutline} on:click={() => muteToggle(num, idSoundBlock, data.bypassAll.byp, definition.api)}>
                      <span class="icon is-small">
                        <i class="fas fa-volume-off"></i>
                      </span>
                  </button>
                {/if}
              </div>
            </div>
          {/each}

          <!-- Output -->
          <div class="column">
            <button class="button is-static is-fullwidth">
              {data.channelNames.outputs[num] || "Out " + num + 1}
            </button>
            <strong></strong>
          </div>
        </div>
      {/each}

      <!-- Volume control -->
      <div class="columns is-centered is-vcentered">
        <div class="column is-1 has-text-right">
          <label class="label" for="db-volume">Volume</label>
        </div>

        <div class="column is-half is-vcentered pos-slider">
          <input bind:value={state.volumeMaster} class="fullwidth-100p" id="mvol" max="{configSite.volume.max}" min="{configSite.volume.min}" step="{configSite.volume.step}" type="range" on:change={updateVolumeMaster}>
        </div>

        <div class="column is-2">
          <div class="control has-icons-right">
            <input class="input" id="db-volume" type="number" max="{configSite.volume.max}" min="{configSite.volume.min}" step="{configSite.volume.step}" bind:value={state.volumeMaster} on:change={updateVolumeMaster}>
            <span class="icon is-small is-right">
              dB
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Preset selection -->
    <footer class="card-footer">
      {#each Object.entries(configPreset) as [id, name] (id)}
        {@const isActive = $presetActive == id ? true : false}
        <button class="button is-info card-footer-item has-text-weight-bold" class:is-active={isActive} on:click={() => presetSwitch(id)}>{data.channelNames.presets[id] || name}</button>
      {/each}
      <button class="button is-success card-footer-item has-text-weight-bold" on:click={() => presetStore() }>Save</button>
    </footer>
  </div>
</div>

<ConfigSpdif bind:spdifInput={data.addonInput.addcfg} bind:spdifOut={data.spdifOut} />

<style>
    .button.is-multiline {
        min-height: 2.25em;
        height: auto;
    }

    .label-narrow {
        margin-bottom: 0;
    }

    .min-width-audio-block {
        min-width: 90px;
    }

    .fullwidth-100p {
        min-width: 100%;
    }

    .pos-slider {
        padding-top: 20px;
    }
</style>
