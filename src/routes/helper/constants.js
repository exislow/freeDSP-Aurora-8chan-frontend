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
    name: "DSP"
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

export const soundProcessor = {
  countChannel: 8,
  soundBlocks: {
    hp: {
      name: {
        short: "HiP",
        long: "High Pass"
      },
      color: "is-info",
      fn: "highpass",
      idPrefix: "hp"
    },
    lshelv: {
      name: {
        short: "LShelf",
        long: "Low Shelf"
      },
      color: "is-link",
      fn: "lowshelf",
      idPrefix: "ls"
    },
    peqbank: {
      name: {
        short: "PEQs",
        long: "Parametric Equalizers"
      },
      color: "is-primary",
      fn: "peak",
      idPrefix: "peqbank"
    },
    hshelv: {
      name: {
        short: "HShelf",
        long: "High Shelf"
      },
      color: "is-link",
      fn: "highshelf",
      idPrefix: "hs"
    },
    lp: {
      name: {
        short: "LoP",
        long: "Low Pass"
      },
      color: "is-info",
      fn: "lowpass",
      idPrefix: "lp"
    },
    phase: {
      name: {
        short: "Phase",
        long: "Phase"
      },
      color: "is-warning",
      fn: "lowpass",
      idPrefix: "ph"
    },
    delay: {
      name: {
        short: "Delay",
        long: "Delay"
      },
      color: "is-success",
      fn: "lowpass",
      idPrefix: "dly"
    },
    gain: {
      name: {
        short: "Gain",
        long: "Gain"
      },
      color: "is-primary",
      fn: "lowpass",
      idPrefix: "gn"
    }
  }
};
