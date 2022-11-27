<script>
  import { apiLoading } from "../helper/store.js";
  import { configAddonPost, spdifOutPost } from "../helper/api.js";
  import { toastError, toastSuccess } from "../helper/toast.js";
  import { configSpdifInput, outputAnalog, configChannelSource } from "../helper/constants.js";

  export let spdifOut = {};
  export let spdifInput = '';

  const output = { ...configChannelSource, ...outputAnalog };

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
      selected: `0x0${spdifInput.toString(16)}`
    }
  }

  async function updateConfigAddon() {
    $apiLoading = true;
    const response = await configAddonPost(stateSpdif.input.selected);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess("S/PDIF input saved.");
      spdifInput = parseInt(stateSpdif.input.selected, 16);
    } else {
      toastError(response);
    }
  }

  async function updateSpdifOut() {
    $apiLoading = true;
    const response = await spdifOutPost(outputChannel.left.selected, outputChannel.right.selected);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess("S/PDIF output saved.");
      spdifOut.spdifleft = outputChannel.left.selected;
      spdifOut.spdifright = outputChannel.right.selected;
    } else {
      toastError(response);
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
            <label class="label">Input</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select bind:value={stateSpdif.input.selected} on:change={updateConfigAddon}>
                  {#each Object.entries(configSpdifInput) as [id, name] (id)}
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
