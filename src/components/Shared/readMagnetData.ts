import data from '../../data/data.json';
import { MagnetData } from '../../types';

export default function readMagnetData() {
  const rawData = localStorage.getItem('magnetData');
  const magnetData: MagnetData[] = rawData !== null ? JSON.parse(rawData) : [];
  console.log(magnetData);

  return magnetData;
}
