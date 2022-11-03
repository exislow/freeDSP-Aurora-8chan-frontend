<script>
  let files;
</script>

<div id="modal-preset" class="modal">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Preset</p>
      <button class="delete" aria-label="close" />
    </header>

    <section class="modal-card-body">
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
                  No file uploaded.
                {/if}
              </span>
            </label>
          </div>
        </div>
        <div class="column">
          <button class="button is-danger is-fullwidth">Import Preset</button>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <button class="button is-success is-fullwidth">Download Preset</button>
        </div>
      </div>
    </section>
  </div>
</div>
