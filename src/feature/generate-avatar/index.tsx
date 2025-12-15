import { useState, useEffect } from 'react'
import { X, Sparkles, Undo2, Redo2 } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet.tsx'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { generateAvatarImages, type AvatarImage } from '@/lib/utils'
import { AvatarImageItem } from './avatar-image-item.tsx'

interface GenerateAvatarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GenerateAvatarDialog({ open, onOpenChange }: GenerateAvatarDialogProps) {
  const [images, setImages] = useState<AvatarImage[]>([])

  useEffect(() => {
    const images = generateAvatarImages(12)

    setImages(images)
  }, [])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[100%] sm:min-w-[400px] pt-7">
        <SheetHeader className="flex-row items-center justify-between pt-0">
          <SheetTitle className="text-custom-fz-1 font-bold">Change background</SheetTitle>
          <SheetDescription className="sr-only">
            Modal for avatars background generation
          </SheetDescription>
          <SheetClose asChild>
            <Button variant="ghost">
              <X className="size-6" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-72px)] pb-6">
          <div className="space-y-6 pb-6 px-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Background idea</h3>
              <div className="relative">
                <Textarea
                  id="avatatar-generate-textarea"
                  placeholder="Describe your background idea..."
                  className="h-[142px] w-full p-4 resize-none border-b-0 rounded-b-none"
                />
                <div className="w-full px-3 py-2 flex items-center justify-between gap-2 bg-background border border-input border-t-0 rounded-t-none rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto px-0 text-xs font-semibold hover:bg-transparent"
                  >
                    <Sparkles size={18} className="size-4 text-green-500" />
                    Regenerate
                  </Button>
                  <div className="flex items-center">
                    <Button variant="ghost" className="hover:bg-accent" disabled>
                      <Undo2 className="size-5" />
                    </Button>
                    <Button variant="ghost" className="hover:bg-accent" disabled>
                      <Redo2 className="size-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full h-12 font-semibold rounded-full">
              <Sparkles className="size-5 text-green-400" />
              Generate BG for 1 credit
            </Button>

            <div className="space-y-4 mt-3">
              <h3 className="text-sm font-semibold mb-2">Your backgrounds</h3>
              <div className="grid grid-cols-3 gap-3">
                {images.map((image) => (
                  <AvatarImageItem
                    key={image.id}
                    image={image}
                    onClick={() => console.log('Selected image:', image.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
