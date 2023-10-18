<script>
  import { apiLoading } from "../helper/store.js";
  import { configAddonPost, spdifOutPost } from "../helper/api.js";
  import { toastErrorHttp, toastSuccess } from "../helper/toast.js";
  import { configSpdifInput, outputAnalog, configChannelSource } from "../helper/constants.js";

  export let spdifInput = '';
  export let spdifOut = {};

  const output = { ...configChannelSource, ...outputAnalog };
  const outputChannel = {}
  const stateSpdif = {};

  function stateSpdifInputSet(spdifInput) {
    stateSpdif.input = {
      selected: `0x0${spdifInput.toString(16)}`
    };
  }
  function stateSpdifOutSet(left, right) {
    outputChannel.left = {
      name: "Left",
      id: "spdif-out-left",
      selected: left
    };
    outputChannel.right = {
      name: "Right",
      id: "spdif-out-right",
      selected: right
    };
  }

  $: stateSpdifInputSet(spdifInput);
  $: stateSpdifOutSet(spdifOut.spdifleft, spdifOut.spdifright);

  async function updateConfigAddon() {
    $apiLoading = true;
    const response = await configAddonPost(stateSpdif.input.selected);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess("S/PDIF input set. Don't forget to save it.");
      spdifInput = parseInt(stateSpdif.input.selected, 16);
    } else {
      toastErrorHttp(response);
      stateSpdifInputSet(spdifInput);
    }
  }

  async function updateSpdifOut() {
    $apiLoading = true;
    const response = await spdifOutPost(outputChannel.left.selected, outputChannel.right.selected);
    $apiLoading = false;

    if (response.ok) {
      toastSuccess("S/PDIF output set. Don't forget to save it.");
      spdifOut.spdifleft = outputChannel.left.selected;
      spdifOut.spdifright = outputChannel.right.selected;
    } else {
      toastErrorHttp(response);
      outputChannel.left.selected = spdifOut.spdifleft;
      outputChannel.right.selected = spdifOut.spdifright;
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
            <label class="label" for="spdif-input">Input</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select id="spdif-input" bind:value={stateSpdif.input.selected} on:change={updateConfigAddon}>
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
              <label class="label" for="spdif-channel-{valueChannel.id}">Output {valueChannel.name}</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select bind:value={ valueChannel.selected } id="spdif-channel-{valueChannel.id}" on:change={updateSpdifOut}>
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
