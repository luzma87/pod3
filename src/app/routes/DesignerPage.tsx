import { useState } from 'react'
import { useParams } from 'react-router'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Dialog from '../../components/ui/Dialog'

function DesignerPage() {
  const { quiltId } = useParams()
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <main className="min-h-screen p-8">
      <h1 className="font-display text-3xl text-maroon">Pod3 Quilt Designer</h1>
      <Card className="mt-6 max-w-md">
        <p className="text-ink-muted">
          {quiltId
            ? `Placeholder — would load quilt "${quiltId}" here.`
            : 'Placeholder — no quilt loaded yet.'}
        </p>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => setInfoOpen(true)}>Open info</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </Card>
      <Dialog
        open={infoOpen}
        onOpenChange={setInfoOpen}
        title="Theme foundation"
        description="This dialog proves the base theme (colors, fonts, Radix-powered dialog) is wired up."
      >
        <Button onClick={() => setInfoOpen(false)}>Close</Button>
      </Dialog>
    </main>
  )
}

export default DesignerPage
