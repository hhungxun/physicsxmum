import Image from 'next/image';

interface ParticleFallbackProps {
  className?: string;
  imageClassName?: string;
  size?: number;
}

export default function ParticleFallback({
  className = '',
  imageClassName = '',
  size = 88,
}: ParticleFallbackProps) {
  return (
    <div className={`flex items-center justify-center ${className}`.trim()}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent/12 blur-2xl" />
        <Image
          src="/particle-in-box.svg"
          alt=""
          width={size}
          height={size}
          aria-hidden="true"
          className={`relative opacity-90 ${imageClassName}`.trim()}
        />
      </div>
    </div>
  );
}
