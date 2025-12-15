import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { GenerateAvatarDialog } from '@/feature/generate-avatar'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={() => setIsDrawerOpen(true)}>Generate Avatar Background</Button>

      <GenerateAvatarDialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </main>
  )
}

export default App
