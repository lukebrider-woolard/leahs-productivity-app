import { MagnetData } from "../types";

const listOfDataTypes = [
  'magnetData',
  'salesData'
];

export function resetLocalData() {
  localStorage.clear();
  localStorage.setItem('init', 'false');
}

export function setLocalDataAsInitialised() {
  localStorage.setItem('init', 'true');
}

export function readLocalData<T>(dataKey: string): T[] {
  const rawData = localStorage.getItem(dataKey);
  const returnData: T[] = rawData !== null ? JSON.parse(rawData) : [];

  return returnData;
}

export function overwriteLocalData<T>(dataKey: string, dataToWrite: T[]) {
  localStorage.setItem(dataKey, JSON.stringify(dataToWrite));
}

export function appendLocalData<T>(dataKey: string, dataToWrite: T | T[]) {
  const previous = readLocalData<T>(dataKey);
  const updated = previous.concat(dataToWrite);
  localStorage.setItem(dataKey, JSON.stringify(updated));
}

export function printLocalData() {
  listOfDataTypes.forEach((dataType) => console.log(readLocalData<any>(dataType)))
}

export function getUniqueBundles() {
  const magnetData = readLocalData<MagnetData>('magnetData');
  const allBundleInfo = magnetData.flatMap((magnet) => magnet.bundles);

  let uniqueBundles: string[] = [];
  allBundleInfo.forEach((bundleName) => {
    if (uniqueBundles.indexOf(bundleName) === -1) {
      uniqueBundles.push(bundleName);
    }
  });

  return uniqueBundles;
}
