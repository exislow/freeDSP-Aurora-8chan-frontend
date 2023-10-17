import {
  delayGet,
  gainGet,
  highShelfGet,
  lowPassGet,
  highPassGet,
  highPassPost,
  lowShelfGet,
  peqBankGet,
  phaseGet,
  lowShelfPost,
  highShelfPost,
  lowPassPost,
  phasePost,
  delayPost,
  gainPost,
  peqBankPost
} from "./api.js";

export const configAudioFilter = {
  0: {
    name: "Bessel 6",
    id: "bessel",
    countCascade: 1
  },
  1: {
    name: "Bessel 12",
    id: "bessel",
    countCascade: 2
  },
  2: {
    name: "Bessel 18",
    id: "bessel",
    countCascade: 3
  },
  3: {
    name: "Bessel 24",
    id: "bessel",
    countCascade: 4
  },
  4: {
    name: "Butterworth 12",
    id: "butterworth",
    countCascade: 2
  },
  5: {
    name: "Butterworth 18",
    id: "butterworth",
    countCascade: 3
  },
  6: {
    name: "Butterworth 24",
    id: "butterworth",
    countCascade: 4
  },
  7: {
    name: "Linkwitz-Riley 12",
    id: "linkwitzRiley",
    countCascade: 1
  },
  8: {
    name: "Linkwitz-Riley 24",
    id: "linkwitzRiley",
    countCascade: 2
  },
  9: {
    name: "Linkwitz-Riley 36",
    id: "linkwitzRiley",
    countCascade: 3
  },
  10: {
    name: "Linkwitz-Riley 48",
    id: "linkwitzRiley",
    countCascade: 4
  }
};

export const configSite = {
  api: {
    //url: import.meta.env.DEV ? "http://localhost:3000" : "",
    url: "http://localhost:3000",
    endpoint: {
      configDevice: "config",
      configAddon: "addoncfg",
      spdifOut: "spdifout",
      audioInput: "allinputs",
      bypassAll: "allbyp",
      fcAll: "allfc",
      volumeMaster: "mvol",
      channelNames: "allnames",
      configWifi: "wificonfig",
      highPass: "hp?idx=",
      lowPass: "lp?idx=",
      highShelf: "hshelv?idx=",
      lowShelf: "lshelv?idx=",
      phase: "phase?idx=",
      delay: "delay?idx=",
      gain: "gain?idx=",
      peqBank: "peqbank?idx=",
      wifiAp: "pwdap",
      wifiConnect: "wifi",
      presetSwitch: "preset",
      upload: "upload?fname="
    },
    mapping: {
      externalToInternal: {
        fc: "fcHz",
        typ: "filterId",
        slope: "slope",
        gain: "gainDb",
        V0: "gainDb",
        bypass: "isBypass",
        mute: "isBypass",
        Q: "q",
        inv: "invert",
        dly: "delayMs"
      }
    }
  },
  volume: {
    min: -80,
    max: 0,
    step: 0.5
  },
  filter: { configAudioFilter }
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

export const filterFunctions = {
  hp: "highpass",
  lp: "lowpass",
  hshelv: "highshelf",
  lshelv: "lowshelf",
  peqbank: "peak",
  phase: "lowpass",
  delay: "lowpass",
  gain: "lowpass"
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
      fnName: filterFunctions.hp,
      idPrefix: "hp",
      api: {
        get: highPassGet,
        post: highPassPost
      },
      dom: [
        {
          element: "select",
          label: "Filter",
          data: "configAudioFilter",
          model: "filterId"
        },
        {
          element: "input",
          type: "number",
          label: "Cut-off Frequency",
          unit: "Hz",
          model: "fcHz"
        },
        {
          element: "button",
          label: "Bypass",
          model: "isBypass"
        }
      ]
    },
    lshelv: {
      name: {
        short: "LShelf",
        long: "Low Shelf"
      },
      color: "is-link",
      fnName: filterFunctions.lshelv,
      idPrefix: "ls",
      api: {
        get: lowShelfGet,
        post: lowShelfPost
      },
      dom: [
        {
          element: "input",
          type: "number",
          label: "Gain",
          unit: "dB",
          model: "gainDb"
        },
        {
          element: "input",
          type: "number",
          label: "Cut-off Frequency",
          unit: "Hz",
          model: "fcHz"
        },
        {
          element: "input",
          type: "number",
          label: "Slope",
          unit: "S",
          model: "slope"
        },
        {
          element: "button",
          label: "Bypass",
          model: "isBypass"
        }
      ]
    },
    peqbank: {
      name: {
        short: "PEQs",
        long: "Parametric Equalizers"
      },
      color: "is-primary",
      fnName: filterFunctions.peqbank,
      idPrefix: "peqbank",
      api: {
        get: peqBankGet,
        post: peqBankPost
      },
      dom: [
        {
          element: "input",
          type: "number",
          label: "Cut-off Frequency",
          unit: "Hz",
          model: "fcHz"
        },
        {
          element: "input",
          type: "number",
          label: "Gain (V0)",
          unit: "dB",
          model: "gainDb"
        },
        {
          element: "input",
          type: "number",
          label: "Bandwidth",
          unit: "Q",
          model: "q"
        },
        {
          element: "button",
          label: "Bypass",
          model: "isBypass"
        }
      ],
      bandsCount: 10
    },
    hshelv: {
      name: {
        short: "HShelf",
        long: "High Shelf"
      },
      color: "is-link",
      fnName: filterFunctions.hshelv,
      idPrefix: "hs",
      api: {
        get: highShelfGet,
        post: highShelfPost
      },
      dom: [
        {
          element: "input",
          type: "number",
          label: "Gain",
          unit: "dB",
          model: "gainDb"
        },
        {
          element: "input",
          type: "number",
          label: "Cut-off Frequency",
          unit: "Hz",
          model: "fcHz"
        },
        {
          element: "input",
          type: "number",
          label: "Slope",
          unit: "S",
          model: "slope"
        },
        {
          element: "button",
          label: "Bypass",
          model: "isBypass"
        }
      ]
    },
    lp: {
      name: {
        short: "LoP",
        long: "Low Pass"
      },
      color: "is-info",
      fnName: filterFunctions.lp,
      idPrefix: "lp",
      api: {
        get: lowPassGet,
        post: lowPassPost
      },
      dom: [
        {
          element: "select",
          label: "Filter",
          data: "configAudioFilter",
          model: "filterId"
        },
        {
          element: "input",
          type: "number",
          label: "Cut-off Frequency",
          unit: "Hz",
          model: "fcHz"
        },
        {
          element: "button",
          label: "Bypass",
          model: "isBypass"
        }
      ]
    },
    phase: {
      name: {
        short: "Phase",
        long: "Phase"
      },
      color: "is-warning",
      fnName: filterFunctions.phase,
      idPrefix: "ph",
      api: {
        get: phaseGet,
        post: phasePost
      },
      dom: [
        {
          element: "input",
          type: "number",
          label: "Cut-off Frequency",
          unit: "Hz",
          model: "fcHz"
        },
        {
          element: "input",
          type: "number",
          label: "Bandwidth",
          unit: "Q",
          model: "q"
        },
        {
          element: "button",
          label: "Bypass",
          model: "isBypass"
        }
      ]
    },
    delay: {
      name: {
        short: "Delay",
        long: "Delay"
      },
      color: "is-success",
      fnName: filterFunctions.delay,
      idPrefix: "dly",
      api: {
        get: delayGet,
        post: delayPost
      },
      dom: [
        {
          element: "input",
          type: "number",
          label: "Delay",
          unit: "ms",
          model: "delayMs"
        },
        {
          element: "button",
          label: "Bypass",
          model: "isBypass"
        }
      ]
    },
    gain: {
      name: {
        short: "Gain",
        long: "Gain"
      },
      color: "is-primary",
      fnName: filterFunctions.gain,
      idPrefix: "gn",
      api: {
        get: gainGet,
        post: gainPost
      },
      dom: [
        {
          element: "input",
          type: "number",
          label: "Gain",
          unit: "dB",
          model: "gainDb"
        },
        {
          element: "button",
          label: "Mute",
          model: "isBypass"
        }
      ]
    }
  }
};

export const configPreset = {
  0: "Preset A",
  1: "Preset B",
  2: "Preset C",
  3: "Preset D"
};

export const configChannelSource = {
  "0x00000000": "Analog 1",
  "0x00000001": "Analog 2",
  "0x00000002": "Analog 3",
  "0x00000003": "Analog 4",
  "0x00000004": "Analog 5",
  "0x00000005": "Analog 6",
  "0x00000006": "Analog 7",
  "0x00000007": "Analog 8",
  "0x00010000": "USB 1",
  "0x00010001": "USB 2",
  "0x00010002": "USB 3",
  "0x00010003": "USB 4",
  "0x00010004": "USB 5",
  "0x00010005": "USB 6",
  "0x00010006": "USB 7",
  "0x00010007": "USB 8",
  "0x00040000": "S/PDIF L",
  "0x00040001": "S/PDIF R"
};
export const configSpdifInput = {
  "0x00": "TOSLINK 1",
  "0x01": "TOSLINK 2",
  "0x02": "TOSLINK 3",
  "0x03": "TOSLINK 4",
  "0x04": "Coax 1",
  "0x05": "Coax 2",
  "0x06": "Coax 3",
  "0x07": "Coax 4"
};
export const outputAnalog = {
  "0x00050000": "Output 1",
  "0x00050001": "Output 2",
  "0x00050002": "Output 3",
  "0x00050003": "Output 4",
  "0x00050004": "Output 5",
  "0x00050005": "Output 6",
  "0x00050006": "Output 7",
  "0x00050007": "Output 8"
};
