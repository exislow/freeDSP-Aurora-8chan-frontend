<script>
  export let spdifOut = {};
  export let configAddon = '';
  export let outputGeneric;

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

  const output = { ...outputGeneric, ...outputAnalog };

  const outputChannel = {
    left: {
      name: "Left",
      id: "spdif-out-left",
      selected: spdifOut.spdifleft
    },
    right: {
      name: "Right",
      id: "spdif-out-right",
      selected: spdifOut.spdifright
    }
  };

  const stateSpdif = {
    input: {
      selected: `0x0${configAddon.toString(16)}`
    }
  }

  function updateConfigAddon() {
    // implement post
    // if 200
    configAddon = parseInt(stateSpdif.input.selected, 16);
  }

  function updateSpdifOut() {
    // implement post
    // if 200
    console.log(outputChannel.left.selected, outputChannel.right.selected)
    spdifOut.spdifleft = outputChannel.left.selected;
    spdifOut.spdifright = outputChannel.right.selected;
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
            <label class="label">Input</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select bind:value={stateSpdif.input.selected} on:change={updateConfigAddon}>
                  {#each Object.entries(input) as [id, name] (id)}
                    <option value="{id}">{name}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        </div>

        {#each Object.entries(outputChannel) as [idChannel, valueChannel] (idChannel)}
          <div class="column">
            <div class="field">
              <label class="label">Output {valueChannel.name}</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select bind:value={ valueChannel.selected } id="{valueChannel.id}" on:change={updateSpdifOut}>
                    {#each Object.entries(output) as [id, name] (id)}
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
