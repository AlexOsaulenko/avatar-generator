import { v4 as uuidv4 } from 'uuid'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface AvatarImage {
  id: string
  url: string
  isGenerating: boolean
  progress: number
  isDefault: boolean
  description: string
  remainingTime: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatarImages(
  count: number = 5,
  width: number = 900,
  height: number = 1600
): AvatarImage[] {
  return Array.from({ length: count }, (_, index) => {
    const randomSeed = Math.floor(Math.random() * 1000)

    return {
      id: uuidv4(),
      url: `https://picsum.photos/seed/${randomSeed}/${width}/${height}`,
      isGenerating: index === 0,
      progress: index === 0 ? 40 : 100,
      remainingTime: index === 0 ? '1 minute left' : '',
      isDefault: index === 1,
      description: `Background ${index + 1}`,
    }
  })
}
