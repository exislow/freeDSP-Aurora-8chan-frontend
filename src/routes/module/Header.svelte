<script>
  import DeviceConfig from '../modal/ModalConfigDevice.svelte';
  import Preset from '../modal/ModalPreset.svelte';
  import {onMount} from 'svelte';

  onMount(() => {
    // Functions to open and close a modal
    function openModal(el) {
      el.classList.add('is-active');
    }

    function closeModal(el) {
      el.classList.remove('is-active');
    }

    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach((modal) => {
        closeModal(modal);
      });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach((trigger) => {
      const modal = trigger.dataset.target;
      const target = document.getElementById(modal);

      trigger.addEventListener('click', () => {
        openModal(target);
      });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach((close) => {
      const target = close.closest('.modal');

      close.addEventListener('click', () => {
        closeModal(target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });
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
            <button class="button has-text-weight-bold js-modal-trigger" data-target="modal-config-device">Device</button>
            <button class="button has-text-weight-bold js-modal-trigger" data-target="modal-preset">Preset</button>
            <a href="/chnames.html" class="button navbar-item has-text-weight-bold">Names</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>

<DeviceConfig />
<Preset />
