import {
  getAudioInput,
  getBypassAll,
  getChannelNames,
  getConfigDevice,
  getConfigWifi,
  getFcAll,
  getSpdifOut,
  getVolumeMaster
} from "./helper/api.js";

export const ssr = false;
export const csr = true;
export const prerender = true;

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
  return {
    configDevice: await getConfigDevice(fetch),
    spdifOut: await getSpdifOut(fetch),
    audioInput: await getAudioInput(fetch),
    bypassAll: await getBypassAll(fetch),
    fcAll: await getFcAll(fetch),
    volumeMaster: await getVolumeMaster(fetch),
    channelNames: await getChannelNames(fetch),
    configWifi: await getConfigWifi(fetch)
  };
}
