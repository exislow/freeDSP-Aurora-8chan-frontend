// Parse REW PEQ file
// TODO: PEQ Handle ON /OFF using BYPASS.
// TODO: Cut peqs array after max PEQ slots
import { toastSuccess, toastWarning } from "./toast.js";

export async function rewPeqParse(content, filename) {
  const regex = /Filter\s+(\d+):\sON\s+PK\s+Fc\s+(.*)\sHz\s+Gain\s+(.*)\sdB\s+Q\s+(.*)/gm;
  let m = null;
  let isPeqImported = false;
  let result = [];

  while ((m = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    let idx = m[1] - 1;
    result[idx] = {
      fcHz: m[2],
      gainDb: m[3],
      q: m[4]
    };

    isPeqImported = true;
  }

  if (isPeqImported == true) {
    toastSuccess("All PEQs have been imported. Please press <strong>Save</strong>.");
  } else {
    toastWarning(
      `<strong>${filename}</strong> doesn't look like a valid REW PEQ text export file.`
    );
  }

  return result;
}
