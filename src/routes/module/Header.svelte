<script>
  import { openModal } from "../helper/modal.js";
</script>

<header>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        class="navbar-item is-family-monospace has-text-weight-bold is-size-4"
        href="https://github.com/freeDSP/freeDSP-aurora" target="_blank">freeDSP Aurora</a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <p class="navbar-item">8 Channel</p>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button has-text-weight-bold js-modal-trigger" data-target="modal-config-device" on:click={(event) => openModal(event.target.dataset.target)}>Device</button>
            <button class="button has-text-weight-bold js-modal-trigger" data-target="modal-preset" on:click={(event) => openModal(event.target.dataset.target)}>Preset</button>
            <a href="/chnames.html" class="button navbar-item has-text-weight-bold">Names</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>
