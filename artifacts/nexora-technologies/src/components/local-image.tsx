import { useState, type ImgHTMLAttributes } from 'react';

type LocalImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackLabel?: string;
  containerClassName?: string;
  'data-testid'?: string;
};

function FallbackMark() {
  return (
    <svg viewBox="0 0 38 38" className="h-12 w-12" aria-hidden="true">
      <defs>
        <linearGradient id="local-image-fallback-mark" x1="3" y1="34" x2="35" y2="4">
          <stop offset="0" stopColor="#155EEF" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d="M7 31V7l24 24V7" fill="none" stroke="url(#local-image-fallback-mark)" strokeWidth="5.2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function LocalImage({ alt, className = '', containerClassName = '', fallbackLabel = 'Nexora visual', onError, ...props }: LocalImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`image-fallback flex items-center justify-center overflow-hidden ${containerClassName} ${className}`} role="img" aria-label={alt || fallbackLabel} data-testid="image-fallback">
        <div className="flex flex-col items-center gap-3">
          <FallbackMark />
          <span className="font-mono-ui text-[9px] uppercase tracking-[.18em] text-cyan-200/60">{fallbackLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      className={`editorial-image block h-full w-full object-cover ${className}`}
      loading={props.loading ?? 'lazy'}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      data-testid={props['data-testid'] ?? 'local-image'}
    />
  );
}
