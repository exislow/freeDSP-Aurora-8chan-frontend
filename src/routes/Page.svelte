<script>
  import { extractFc, isBypassActive, range } from "./helper/range.js";
  import ConfigSpdif from "./component/ConfigSpdif.svelte";
  import { configSite, modal, soundProcessor } from "./helper/constants.js";
  import { filterActive } from "./helper/store.js";
  import { modalOpen } from "./helper/modal.js";

  export let data;
  let volumeMaster = data.volumeMaster.vol;

  const configPreset = {
    0: "Preset A",
    1: "Preset B",
    2: "Preset C",
    3: "Preset D"
  };

  const configChannelSource = {
    "0x00000000": "Analog 1",
    "0x00000001": "Analog 2",
    "0x00000002": "Analog 3",
    "0x00000003": "Analog 4",
    "0x00000004": "Analog 5",
    "0x00000005": "Analog 6",
    "0x00000006": "Analog 7",
    "0x00000007": "Analog 8",
    "0x00010000": "USB 1",
    "0x00010001": "USB 2",
    "0x00010002": "USB 3",
    "0x00010003": "USB 4",
    "0x00010004": "USB 5",
    "0x00010005": "USB 6",
    "0x00010006": "USB 7",
    "0x00010007": "USB 8",
    "0x00040000": "S/PDIF L",
    "0x00040001": "S/PDIF R"
  };

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

  function activateModalChart(target, filterId, channelNumber) {
    $filterActive.id = filterId;
    $filterActive.channelNumber = channelNumber;

    modalOpen(target);
  }

  function updateVolumeMaster() {
    // implement post
    // if 200
    volumeMaster = state.volumeMaster;
  }
  </script>

<svelte:head>
  <title>8 Channel | freeDSP Aurora</title>
  <meta content="Svelte demo app" name="description" />
</svelte:head>

<div class="card">
  <div class="card-content">
    <div class="content">
      {#each range(0, soundProcessor.countChannel, 1) as num (num)}
        <div class="columns is-variable is-1 mb-0 is-vcentered">
          <div class="column is-fullwidth">
            <div class="field">
              <label class="label label-narrow">{data.channelNames.inputs[num]}</label>
              <div class="control">
                <div class="select">
                  <select bind:value={ state.input[num] }>
                    {#each Object.entries(configChannelSource) as [id, name] (id)}
                      <option value="{id}">{name}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {#each Object.entries(soundProcessor.soundBlocks) as [name, definition], index (name)}
            <div class="column">
              <div class="field has-addons">
                <button
                  class="button min-width-audio-block is-fullwidth {definition.color} js-modal-trigger is-multiline"
                  data-target="{modal.chartGeneric.id}"
                  on:click={() => activateModalChart(modal.chartGeneric.id, name, num)}>
                  <span>
                    <span class="has-text-weight-bold">{definition.name.short}</span><br />
                    <span class="is-size-7 is-family-code">{extractFc(definition.idPrefix + num, data.fcAll.fc)}</span>
                  </span>
                </button>

                {#if name !== 'phase'}
                  <button class="button is-danger is-multiline"
                          class:is-outlined={isBypassActive(definition.idPrefix + num, data.bypassAll.byp) === 0}>
                      <span class="icon is-small">
                        <i class="fas fa-volume-off"></i>
                      </span>
                  </button>
                {/if}
              </div>
            </div>
          {/each}

          <div class="column">
            <button class="button is-static is-fullwidth">
              {data.channelNames.outputs[num] || "Out " + num + 1}
            </button>
            <strong></strong>
          </div>
        </div>
      {/each}

      <div class="columns is-centered is-vcentered">
        <div class="column is-1 has-text-right">
          <label class="label">Volume</label>
        </div>

        <div class="column is-half is-vcentered pos-slider">
          <input bind:value={state.volumeMaster} class="fullwidth-100p" id="mvol" max="{configSite.volume.max}" min="{configSite.volume.min}" step="{configSite.volume.step}" type="range" on:change={updateVolumeMaster}>
        </div>

        <div class="column is-2">
          <div class="control has-icons-right">
            <input class="input" type="number" max="{configSite.volume.max}" min="{configSite.volume.min}" step="{configSite.volume.step}" bind:value={state.volumeMaster} on:change={updateVolumeMaster}>
            <span class="icon is-small is-right">
              dB
            </span>
          </div>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      {#each Object.entries(configPreset) as [id, name] (id)}
        <button class="button is-info card-footer-item has-text-weight-bold">{data.channelNames.presets[id] || name}</button>
      {/each}
      <button class="button is-success card-footer-item has-text-weight-bold">Save</button>
    </footer>
  </div>
</div>

<ConfigSpdif bind:configAddon={data.configDevice.addcfg} bind:spdifOut={data.spdifOut} outputGeneric={configChannelSource} />

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
