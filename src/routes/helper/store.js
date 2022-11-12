import { writable } from "svelte/store";

export const modalActive = writable(false);
export const apiLoading = writable(false);
export const filterActive = writable({
  id: "",
  channelNumber: 0
});
