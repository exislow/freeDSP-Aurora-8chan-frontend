<script>
  import { range } from "./helper/range.js";
  import ConfigSpdif from "./module/ConfigSpdif.svelte";
  import ModalChartGeneric from "./modal/ModalChartGeneric.svelte";
  import { apiAllfc, apiAllinputs, apiAllnames, apiMvol, apiAllbyp } from "./data.js";

  const configSoundProc = {
    countChannel: 8,
    soundBlocks: {
      hp: {
        name: "HiP",
        color: "is-info",
        fn: "highpass",
        idPrefix: "hp"
      },
      lshelv: {
        name: "LShelf",
        color: "is-link",
        fn: "lowshelf",
        idPrefix: "ls"
      },
      peqbank: {
        name: "PEQs",
        color: "is-primary",
        fn: "peak",
        idPrefix: "peqbank"
      },
      hshelv: {
        name: "HShelf",
        color: "is-link",
        fn: "highshelf",
        idPrefix: "hs"
      },
      lp: {
        name: "LoP",
        color: "is-info",
        fn: "lowpass",
        idPrefix: "lp"
      },
      phase: {
        name: "Phase",
        color: "is-warning",
        fn: "lowpass",
        idPrefix: "ph"
      },
      delay: {
        name: "Delay",
        color: "is-success",
        fn: "lowpass",
        idPrefix: "dly"
      },
      gain: {
        name: "Gain",
        color: "is-primary",
        fn: "lowpass",
        idPrefix: "gn"
      }
    }
  };

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
    activeFilter: null,
    mVol: apiMvol.vol,
    input: {
      0: apiAllinputs.in0,
      1: apiAllinputs.in1,
      2: apiAllinputs.in2,
      3: apiAllinputs.in3,
      4: apiAllinputs.in4,
      5: apiAllinputs.in5,
      6: apiAllinputs.in6,
      7: apiAllinputs.in7
    }
  };

  function extractFc(idFc, allFc) {
    const regex = /<h4>(.*)<\/h4>/;
    const obj = allFc.find(o => o.name === idFc);
    let m;
    let value = "-";

    if (obj && (m = regex.exec(obj.val)) !== null) {
      // The result can be accessed through the `m`-variable.
      m.forEach((match) => {
        value = match;
      });
    }

    return value;
  }

  function isBypassActive(idBypass, allBypass) {
    const obj = allBypass.find(o => o.name === idBypass);
    let value = 0;

    if (obj) {
      value = obj.val;
    }

    return value;
  }
</script>

<svelte:head>
  <title>8 Channel | freeDSP Aurora</title>
  <meta content="Svelte demo app" name="description" />
</svelte:head>

<div class="card">
  <div class="card-content">
    <div class="content">
      {#each range(0, configSoundProc.countChannel, 1) as num}
        <div class="columns is-variable mb-0 is-vcentered">
          <div class="column is-fullwidth">
            <div class="field">
              <label class="label label-narrow">{apiAllnames.inputs[num]}</label>
              <div class="control">
                <div class="select">
                  <select bind:value={ state.input[num] }>
                    {#each Object.entries(configChannelSource) as [id, name]}
                      <option value="{id}">{name}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {#each Object.entries(configSoundProc.soundBlocks) as [name, definition]}
            <div class="column">
              <div class="field has-addons">
                <button class="button is-fullwidth .min-width {definition.color} js-modal-trigger is-multiline"
                        data-target="modal-chart-generic"
                        on:click={state.activeFilter = definition.fn}><span><span>{definition.name}</span><br /><span
                  class="is-size-7 is-family-code">{extractFc(definition.idPrefix + num, apiAllfc.fc)}</span></span>
                </button>
                {#if name !== 'phase'}
                  <button class="button is-danger is-multiline {isBypassActive(definition.idPrefix + num, apiAllbyp.byp) === 0 ? 'is-outlined' : ''}">
                      <span class="icon is-small">
                        <i class="fas fa-volume-off"></i>
                      </span>
                  </button>
                {/if}
              </div>
            </div>
          {/each}
          <div class="column">
            <button class="button is-static">
              {apiAllnames.outputs[num] || "Out " + num + 1}
            </button>
            <strong></strong>
          </div>
        </div>
      {/each}

      <div class="columns">
        <div class="column">
          <div class="field is-fullwidth">
            <label class="label">Volume</label>
            <div class="control">
              <input bind:value={state.mVol} class="slider" id="mvol" max="0" min="-80" step="1" type="range" />
            </div>
          </div>
        </div>
        <div class="column is-one-fifth">
          <span class="tag is-light">{state.mVol}</span>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      {#each Object.entries(configPreset) as [id, name]}
        <button class="button is-info card-footer-item">{apiAllnames.presets[id] || name}</button>
      {/each}
      <button class="button is-success card-footer-item">Save</button>
    </footer>
  </div>
</div>

<ConfigSpdif outputGeneric={configChannelSource} />
<ModalChartGeneric bind:filter={state.activeFilter} />

<style>
    .button.is-multiline {
        min-height: 2.25em;
        height: auto;
    }

    .label-narrow {
        margin-bottom: 0;
    }

    .button.min-width {
        min-width: 60px;
    }
</style>
