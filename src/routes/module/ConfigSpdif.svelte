<script>
  import { apiSpdifout, apiConfig } from "../data.js";

  const input = {
    "0x00": "TOSLINK 1",
    "0x01": "TOSLINK 2",
    "0x02": "TOSLINK 3",
    "0x03": "TOSLINK 4",
    "0x04": "Coax 1",
    "0x05": "Coax 2",
    "0x06": "Coax 3",
    "0x07": "Coax 4"
  };

  const outputAnalog = {
    "0x00050000": "Output 1",
    "0x00050001": "Output 2",
    "0x00050002": "Output 3",
    "0x00050003": "Output 4",
    "0x00050004": "Output 5",
    "0x00050005": "Output 6",
    "0x00050006": "Output 7",
    "0x00050007": "Output 8"
  };

  export let outputGeneric;
  const output = { ...outputGeneric, ...outputAnalog };

  const outputChannel = {
    left: {
      name: "Left",
      id: "spdif-out-left",
      selected: apiSpdifout.spdifleft
    },
    right: {
      name: "Right",
      id: "spdif-out-right",
      selected: apiSpdifout.spdifright
    }
  };

  const stateSpdif = {
    input: {
      selected: `0x0${apiConfig.addcfg.toString(16)}`
    }
  }
</script>

<div class="card">
  <div class="card-content">
    <div class="media-content">
      <p class="title is-4">S/PDIF Settings</p>
    </div>

    <div class="content">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">S/PDIF Input</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select bind:value={stateSpdif.input.selected}>
                  {#each Object.entries(input) as [id, name]}
                    <option value="{id}">{name}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        </div>

        {#each Object.entries(outputChannel) as [idChannel, valueChannel]}
          <div class="column">
            <div class="field">
              <label class="label">S/PDIF Output {valueChannel.name}</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select bind:value={ valueChannel.selected } id="{valueChannel.id}">
                    {#each Object.entries(output) as [id, name]}
                      <option value="{id}">{name}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
