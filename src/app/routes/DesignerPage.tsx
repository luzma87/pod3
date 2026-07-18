import { useParams } from 'react-router'

function DesignerPage() {
  const { quiltId } = useParams()

  return (
    <main>
      <h1>Pod3 Quilt Designer</h1>
      <p>
        {quiltId
          ? `Placeholder — would load quilt "${quiltId}" here.`
          : 'Placeholder — no quilt loaded yet.'}
      </p>
    </main>
  )
}

export default DesignerPage
