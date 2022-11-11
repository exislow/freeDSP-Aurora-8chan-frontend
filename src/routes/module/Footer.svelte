<script>
  import { hardware } from "../helper/constants.js";
  export let configDevice = {};
</script>

<footer class="footer">
  <div class="container">
    <div class="columns">
      <div class="column">
        <ul>
          <li>
            Wi-Fi IP Address: <strong class="is-family-monospace has-text-weight-bold is-size-6"
              >{ configDevice.ip }</strong
            >
          </li>
          <li>
            Installed Addon: <strong class="is-family-monospace has-text-weight-bold is-size-6"
              >{ hardware.value.addon.value[configDevice.aid] }</strong
            >
          </li>
          <li>
            Installed Plugin: <strong class="is-family-monospace has-text-weight-bold is-size-6"
              >8 Channel</strong
            >
          </li>
        </ul>
      </div>
      <div class="column">
        <div class="field is-grouped is-grouped-multiline is-pulled-right">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-dark">Firmware</span>
              <span class="tag is-info">{ configDevice.fw }</span>
            </div>
          </div>

          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-dark">Plugin</span>
              <span class="tag is-info">{ configDevice.plugin }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
