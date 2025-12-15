import { useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { CircularProgress } from '@/components/custom/circular-progress'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import type { AvatarImage } from '@/lib/utils'

interface AvatarImageItemProps {
  image: AvatarImage
  onClick?: () => void
}

export function AvatarImageItem({ image, onClick }: AvatarImageItemProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  if (image.isGenerating) {
    return (
      <AspectRatio
        key={image.id}
        ratio={9 / 16}
        className={cn(
          'relative rounded-lg overflow-hidden border cursor-pointer transition-all border-foreground bg-black flex flex-col justify-center'
        )}
        onClick={onClick}
      >
        <CircularProgress
          value={image.progress}
          size={65}
          strokeWidth={3}
          showLabel
          labelClassName="text-sm font-medium text-white"
          renderLabel={(progress) => `${progress}%`}
        />
        {image.remainingTime && (
          <p className="absolute w-full text-center left-0 bottom-0 pb-3 text-xs text-white font-semibold">
            {image.remainingTime}
          </p>
        )}
      </AspectRatio>
    )
  }

  return (
    <AspectRatio
      key={image.id}
      ratio={9 / 16}
      className={cn(
        'rounded-lg overflow-hidden border cursor-pointer transition-all hover:border-foreground relative'
      )}
      onClick={onClick}
    >
      {image.isDefault && !isImageLoading && (
        <Badge
          className="absolute top-2 left-2 font-bold text-[10px] pt-0.5 uppercase z-10"
          variant="white"
        >
          Default
        </Badge>
      )}
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Spinner className="size-8" />
        </div>
      )}
      <img
        src={image.url}
        alt={image.description}
        className="size-full object-cover"
        loading="lazy"
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
      />
    </AspectRatio>
  )
}
