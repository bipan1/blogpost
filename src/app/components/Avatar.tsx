import Image from 'next/image';

const Avatar = ({
  size,
  className = '',
}: {
  size: number;
  className?: string;
}) => (
  <span
    className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-zinc-200 ${className}`}
    style={{ width: size, height: size }}
  >
    {/* The photo is a wide shot; zoom in so the face fills the circle. */}
    <Image
      src="/images/profile.png"
      alt="Bipan Chhetri"
      fill
      sizes={`${size * 2}px`}
      className="origin-[47%_32%] scale-[1.9] object-cover object-[47%_32%]"
      priority={size > 48}
    />
  </span>
);

export default Avatar;
