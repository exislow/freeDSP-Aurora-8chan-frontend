<script>
  import {
    presetFilePost,
    presetSwitchPost
  } from "../helper/api.js";
  import { apiLoading } from "../helper/store.js";
  import { toastErrorHttp, toastSuccess } from "../helper/toast.js";

  export let presetIdSelected;
  export let presets;
  let files;
  // TODO: Refactor all occurences of preset text in code to a helper function somehow.
  let presetNameSelected = presets[presetIdSelected] || 'Preset ' + presetIdSelected;

  // TODO: Preset import not tested, yet.
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
        <input class="file-input" type="file" name="resume" bind:files>
        <span class="file-cta">
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          {#if files && files[0]}
            {files[0].name}
          {:else}
            No file selected.
          {/if}
        </span>
      </label>
    </div>
  </div>
  <div class="column">
    <button class="button is-warning is-fullwidth" on:click={() => presetImport(files[0].name)}>Import Preset for&nbsp;<strong>{presetNameSelected}</strong></button>
  </div>
</div>
<div class="columns">
  <div class="column">
    <a class="button is-success is-fullwidth" href="/preset.param" target="_blank" rel="external">Download&nbsp;<strong>{presetNameSelected}</strong>&nbsp;Preset</a>
  </div>
</div>
