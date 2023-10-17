<script>
  import { modalOpen } from "../helper/modal.js";
  import { modal } from "../helper/constants.js";
</script>

<header>
  <nav class="navbar" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        class="navbar-item is-family-monospace has-text-weight-bold is-size-4"
        href="https://github.com/freeDSP/freeDSP-aurora" target="_blank" rel="external">freeDSP Aurora</a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <p class="navbar-item">8 Channel</p>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button has-text-weight-bold js-modal-trigger" data-target="{modal.configDevice.id}" on:click={(event) => modalOpen(event.target.dataset.target)}>Device</button>
            <button class="button has-text-weight-bold js-modal-trigger" data-target="{modal.preset.id}" on:click={(event) => modalOpen(event.target.dataset.target)}>Preset</button>
            <a href="/chnames.html" class="button navbar-item has-text-weight-bold" rel="external">Names</a>
            <a href="/fallback" class="button navbar-item has-text-weight-bold" rel="external">Upload Plugin</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>
