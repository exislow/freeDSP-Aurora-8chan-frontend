import { dev } from "$app/environment";

export const configSite = {
  api: {
    url: dev ? "http://localhost:3000" : "",
    endpoint: {
      configDevice: "config",
      spdifOut: "spdifout",
      audioInput: "allinputs",
      bypassAll: "allbyp",
      fcAll: "allfc",
      volumeMaster: "mvol",
      channelNames: "allnames",
      configWifi: "wificonfig"
    }
  },
  volume: {
    min: -80,
    max: 0,
    step: 0.5
  }
};

export const modal = {
  configDevice: {
    id: "modal-config-device",
    name: "Device Config"
  },
  preset: {
    id: "modal-preset",
    name: "Preset"
  },
  chartGeneric: {
    id: "modal-chart-generic",
    name: "tbd"
  }
};

export const hardware = {
  name: "Hardware",
  url: "x",
  value: {
    addon: {
      name: "AddOn",
      value: {
        0: "None or Custom",
        1: "A - The woodworker's friend.",
        2: "B - Down with the developers.",
        3: "C - Control over the crowd.",
        4: "D - Balanced life."
      }
    },
    addonSettings: {
      name: "AddOn Settings per Preset?",
      value: {
        0: "No",
        1: "Yes"
      }
    },
    adcSummation: {
      name: "ADC Channel Summation",
      value: {
        0: "None",
        1: "8 to 4",
        2: "8 to 2",
        3: "8 to 1"
      }
    },
    volumePotentiometer: {
      name: "Volume Potentiometer",
      value: {
        0: "Not installed.",
        1: "Installed"
      }
    }
  }
};
