import { MagnetData } from "../../types";

export function readMagnetData() {
  const rawData = localStorage.getItem("magnetData");
  const magnetData: MagnetData[] = rawData !== null ? JSON.parse(rawData) : [];

  return magnetData;
}

export function getUniqueBundles() {
  const magnetData = readMagnetData();
  const allBundleInfo = magnetData.flatMap((magnet) => magnet.bundles);

  let uniqueBundles: string[] = [];
  allBundleInfo.forEach((bundleName) => {
    if (uniqueBundles.indexOf(bundleName) === -1) {
      uniqueBundles.push(bundleName);
    }
  });

  return uniqueBundles;
}
