import { toast } from "@zerodevx/svelte-toast";

export function toastSuccess(msg) {
  toast.push(msg, {
    theme: {
      "--toastColor": "mintcream",
      "--toastBackground": "rgb(72,187,120)",
      "--toastBarBackground": "#2F855A"
    }
  });
}

export function toastError(msg) {
  toast.push(msg, {
    theme: {
      "--toastColor": "#fff",
      "--toastBackground": "rgb(231, 76, 60)",
      "--toastBarBackground": "rgb(219, 40, 22)"
    }
  });
}
