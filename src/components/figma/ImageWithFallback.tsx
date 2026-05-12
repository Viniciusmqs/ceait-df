import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface Props {
  src: string
  alt: string
  className?: string
}

export function ImageWithFallback({ src, alt, className }: Props) {
  const [err, setErr] = useState(false)

  if (err) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className ?? ''}`}>
        <ImageOff size={20} className="text-gray-400" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErr(true)}
    />
  )
}
