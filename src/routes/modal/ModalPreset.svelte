<script>
  import {
    presetFilePost,
    presetSwitchPost
  } from "../helper/api.js";
  import { apiLoading } from "../helper/store.js";
  import { toastErrorHttp, toastSuccess } from "../helper/toast.js";

  export let presetIdSelected;
  export let presets;
  let filesPreset;
  // TODO: Refactor all occurences of preset text in code to a helper function somehow.
  let presetNameSelected = presets[presetIdSelected] || 'Preset ' + presetIdSelected;

  // TODO: Preset import not tested, yet.
  // TODO: Add "ARE YOU SURE?" dialogue.
  async function presetImport(presetFile) {
    $apiLoading = true;
    const response = await presetFilePost(presetIdSelected, presetFile);

    if (response.ok) {
      const presetSwitchState = await presetSwitchPost(presetIdSelected);

      toastSuccess(`Preset imported for <strong>${presetNameSelected} suscessfully</strong>.`);
    } else {
      toastErrorHttp(response);
    }

    $apiLoading = false;
  }

  // Import REW PEQ
  let filesRewPeq = null;
  let fileNameRewPeq = "No file selected.";
  $: if (filesRewPeq) {
    fileNameRewPeq = filesRewPeq[0].name;
  }

  async function importRewPeq() {

  }

</script>


<div class="columns">
  <div class="column">
    <p>You can either upload a formerly exported preset or export the current preset. Please make sure, that the exported preset plugin version matches the current plugin version before importing it.</p>
  </div>
</div>
<div class="columns">
  <div class="column">
    <div class="file is-info has-name has-addons is-fullwidth">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" bind:files={filesPreset}>
        <span class="file-cta">
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          {#if filesPreset && filesPreset[0]}
            {filesPreset[0].name}
          {:else}
            No file selected.
          {/if}
        </span>
      </label>
    </div>
  </div>
  <div class="column">
    <button class="button is-warning is-fullwidth" on:click={() => presetImport(filesPreset[0].name)}  disabled="{filesPreset ? false : true }">Import Preset for&nbsp;<strong>{presetNameSelected}</strong></button>
  </div>
</div>
<div class="columns">
  <div class="column">
    <a class="button is-success is-fullwidth" href="/preset.param" target="_blank" rel="external">Download&nbsp;<strong>{presetNameSelected}</strong>&nbsp;Preset</a>
  </div>
</div>
<!-- Import PEQ preset -->
<div class="columns">
  <div class="column">
    <h2>Import PEQ Preset</h2>
    <p>You can import your text exported REW PEQ preset here to apply it to every available channel.<span class="is-italic">Note: Be careful. This overwrites all your existing PEQ settings.</span></p>
  </div>
</div>
<div class="columns">
  <div class="column">
    <div class="file is-info has-name has-addons is-fullwidth">
      <label class="file-label">
        <input class="file-input" type="file" name="filesRewPeq" bind:files={filesRewPeq}>
        <span class="file-cta">
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">{fileNameRewPeq}</span>
      </label>
    </div>
  </div>
  <div class="column">
    <button class="button is-warning is-fullwidth" on:click={() => importRewPeq(filesRewPeq[0])} disabled="{filesRewPeq ? false : true }">Import REW PEQs</button>
  </div>
</div>
