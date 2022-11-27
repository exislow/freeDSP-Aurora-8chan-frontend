import {
  configAddonGet,
  audioInputGet,
  bypassAllGet,
  channelNamesGet,
  configDeviceGet,
  configWifiGet,
  fcAllGet,
  spdifOutGet,
  volumeMasterGet
} from "./helper/api.js";

export const ssr = false;
export const csr = true;
export const prerender = true;

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
  return {
    configDevice: await configDeviceGet(fetch),
    addonInput: await configAddonGet(fetch),
    spdifOut: await spdifOutGet(fetch),
    audioInput: await audioInputGet(fetch),
    bypassAll: await bypassAllGet(fetch),
    fcAll: await fcAllGet(fetch),
    volumeMaster: await volumeMasterGet(fetch),
    channelNames: await channelNamesGet(fetch),
    configWifi: await configWifiGet(fetch)
  };
}
