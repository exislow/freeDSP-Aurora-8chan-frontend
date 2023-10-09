import { soundProcessor } from "./constants.js";

// Parse REW PEQ file
// TODO: PEQ Handle ON/OFF using BYPASS.
export function rewPeqParse(content, arrayAdjust = true) {
  const regex = /Filter\s+(\d+):\sON\s+PK\s+Fc\s+(.*)\sHz\s+Gain\s+(.*)\sdB\s+Q\s+(.*)/gm;
  let m = null;
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
      q: m[4],
      isBypass: "0"
    };
  }

  if (arrayAdjust) {
    result = result.slice(0, soundProcessor.soundBlocks.peqbank.bandsCount);
  }

  return result;
}
