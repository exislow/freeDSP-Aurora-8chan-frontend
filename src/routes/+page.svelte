<script>
  import { range } from "./range.js";
  import ConfigSpdif from "./ConfigSpdif.svelte";
  import ModalChartGeneric from "./ModalChartGeneric.svelte";

  const configSoundProc = {
    countChannel: 8,
    soundBlocks: {
      hp: {
        name: "HiP",
        color: "is-info"
      },
      lshelv: {
        name: "LShelf",
        color: "is-link"
      },
      peqbank: {
        name: "PEQs",
        color: "is-primary"
      },
      hshelv: {
        name: "HShelf",
        color: "is-link"
      },
      lp: {
        name: "LoP",
        color: "is-info"
      },
      phase: {
        name: "Phase",
        color: "is-warning"
      },
      delay: {
        name: "Delay",
        color: "is-success"
      },
      gain: {
        name: "Gain",
        color: "is-danger"
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
    0x00000000: "Analog 1",
    0x00000001: "Analog 2",
    0x00000002: "Analog 3",
    0x00000003: "Analog 4",
    0x00000004: "Analog 5",
    0x00000005: "Analog 6",
    0x00000006: "Analog 7",
    0x00000007: "Analog 8",
    0x00010000: "USB 1",
    0x00010001: "USB 2",
    0x00010002: "USB 3",
    0x00010003: "USB 4",
    0x00010004: "USB 5",
    0x00010005: "USB 6",
    0x00010006: "USB 7",
    0x00010007: "USB 8",
    0x00040000: "S/PDIF L",
    0x00040001: "S/PDIF R"
  };
</script>

<svelte:head>
  <title>8 Channel | freeDSP Aurora</title>
  <meta content="Svelte demo app" name="description" />
</svelte:head>

<div class="card">
  <div class="card-content">
    <div class="content">
      {#each range(0, configSoundProc.countChannel, 1) as num}
        <div class="columns is-variable is-1 mb-0 is-vcentered">
          <div class="column">
            <div class="select">
              <select>
                {#each Object.entries(configChannelSource) as [id, name]}
                  <option value="{id}">{name}</option>
                {/each}
              </select>
            </div>
          </div>
          {#each Object.entries(configSoundProc.soundBlocks) as [name, definition]}
            <div class="column">
              <div class="field has-addons">
                <button class="button is-fullwidth {definition.color} js-modal-trigger is-multiline"
                        data-target="modal-chart-generic"><span><span>{definition.name}</span><br /><span
                  class="is-size-7 is-family-code">aa</span></span>
                </button>
                <button class="button is-danger is-outlined is-multiline">
                    <span class="icon is-small">
                      <i class="fas fa-volume-off"></i>
                    </span>
                </button>
              </div>
            </div>
          {/each}
          <div class="column">
            <strong>Out {num + 1}</strong>
          </div>
        </div>
      {/each}
    </div>

    <footer class="card-footer">
      {#each Object.entries(configPreset) as [id, name]}
        <button class="button is-info card-footer-item">{name}</button>
      {/each}
      <button class="button is-success card-footer-item">Save</button>
    </footer>
  </div>
</div>

<ConfigSpdif outputGeneric={configChannelSource} />
<ModalChartGeneric />

<style>
    .button.is-multiline {
        min-height: 2.25em;
        height: auto;
    }
</style>
