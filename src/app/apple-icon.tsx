import { ImageResponse } from 'next/og';
import Monogram from './components/Monogram';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// iOS applies its own rounded mask, so the square is drawn without corners.
export default function AppleIcon() {
  return new ImageResponse(<Monogram size={180} radius={0} />, size);
}
