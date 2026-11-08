/**
 * The "BC" mark from the navbar, drawn for ImageResponse in app/apple-icon.tsx
 * (app/icon.svg is the same mark for browser tabs). ImageResponse only
 * supports inline styles and flexbox.
 */
const Monogram = ({ size, radius }: { size: number; radius: number }) => (
  <div
    style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#18181b', // zinc-900, same as the navbar mark
      borderRadius: radius,
      color: '#ffffff',
      fontSize: size * 0.44,
      fontWeight: 700,
      letterSpacing: -size * 0.02,
    }}
  >
    BC
  </div>
);

export default Monogram;
