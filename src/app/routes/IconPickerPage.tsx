import broom from '../../assets/icons/011-broom.svg'
import clean from '../../assets/icons/013-clean.svg'
import grid from '../../assets/icons/028-grid.svg'
import grid1 from '../../assets/icons/029-grid-1.svg'
import grid2 from '../../assets/icons/031-grid-2.svg'
import magicWand from '../../assets/icons/006-magic-wand.svg'
import measuringTape from '../../assets/icons/026-measuring-tape.svg'
import mesh from '../../assets/icons/021-mesh.svg'
import meter from '../../assets/icons/027-meter.svg'
import moon from '../../assets/icons/017-moon.svg'
import moon1 from '../../assets/icons/018-moon-1.svg'
import paint from '../../assets/icons/005-paint.svg'
import paintBrush from '../../assets/icons/004-paint-brush.svg'
import colorPalette from '../../assets/icons/032-color-palette.svg'
import paintPalette from '../../assets/icons/003-paint-palette.svg'
import ruler from '../../assets/icons/007-ruler.svg'
import sun from '../../assets/icons/012-sun.svg'
import sun1 from '../../assets/icons/014-sun-1.svg'
import sun2 from '../../assets/icons/015-sun-2.svg'
import sun3 from '../../assets/icons/016-sun-3.svg'
import transfer from '../../assets/icons/008-transfer.svg'
import feather from '../../assets/icons/019-feather.svg'

interface IconGroup {
  concept: string
  usedFor: string
  currentDefault: string
  variants: { file: string; src: string }[]
}

const GROUPS: IconGroup[] = [
  {
    concept: 'Sun (theme toggle, light mode)',
    usedFor: 'ThemeToggle.tsx',
    currentDefault: '014-sun-1.svg',
    variants: [
      { file: '012-sun.svg', src: sun },
      { file: '014-sun-1.svg', src: sun1 },
      { file: '015-sun-2.svg', src: sun2 },
      { file: '016-sun-3.svg', src: sun3 },
    ],
  },
  {
    concept: 'Moon (theme toggle, dark mode)',
    usedFor: 'ThemeToggle.tsx',
    currentDefault: '017-moon.svg',
    variants: [
      { file: '017-moon.svg', src: moon },
      { file: '018-moon-1.svg', src: moon1 },
    ],
  },
  {
    concept: 'Grid (major grid-lines picker)',
    usedFor: 'MajorGridLinesPicker.tsx',
    currentDefault: '028-grid.svg',
    variants: [
      { file: '028-grid.svg', src: grid },
      { file: '029-grid-1.svg', src: grid1 },
      { file: '031-grid-2.svg', src: grid2 },
      { file: '021-mesh.svg', src: mesh },
    ],
  },
  {
    concept: 'Reset button',
    usedFor: 'Workspace.tsx',
    currentDefault: '013-clean.svg',
    variants: [
      { file: '011-broom.svg', src: broom },
      { file: '013-clean.svg', src: clean },
    ],
  },
  {
    concept: 'Quilt size picker',
    usedFor: 'QuiltSizePicker.tsx',
    currentDefault: '026-measuring-tape.svg',
    variants: [
      { file: '007-ruler.svg', src: ruler },
      { file: '026-measuring-tape.svg', src: measuringTape },
      { file: '027-meter.svg', src: meter },
    ],
  },
  {
    concept: 'Move/grab spell (Wingardium Leviosa)',
    usedFor: 'PlacedBlockView.tsx',
    currentDefault: '019-feather.svg',
    variants: [
      { file: '019-feather.svg', src: feather },
      { file: '008-transfer.svg', src: transfer },
      { file: '006-magic-wand.svg', src: magicWand },
    ],
  },
  {
    concept: 'Recolor spell (Colovaria)',
    usedFor: 'PlacedBlockView.tsx',
    currentDefault: '003-paint-palette.svg',
    variants: [
      { file: '032-color-palette.svg', src: colorPalette },
      { file: '003-paint-palette.svg', src: paintPalette },
      { file: '004-paint-brush.svg', src: paintBrush },
      { file: '005-paint.svg', src: paint },
    ],
  },
]

// Temporary, unlinked page for comparing icon variants side by side at
// real size before picking a final one per slot — see docs/icons.md.
// Safe to delete once every group below has a chosen winner.
function IconPickerPage() {
  return (
    <main className="mx-auto h-full max-w-3xl overflow-y-auto p-8">
      <h1 className="mb-2 font-display text-2xl text-maroon">
        Icon variant picker (temporary)
      </h1>
      <p className="mb-8 text-sm text-ink-muted">
        Each group below is one UI slot with multiple candidate icons. The
        bolded one is currently wired in as the default. Tell me the filename
        you want for each group and I'll finish wiring it in, then delete this
        page.
      </p>
      <div className="flex flex-col gap-8">
        {GROUPS.map((group) => (
          <section key={group.concept}>
            <h2 className="font-medium text-ink">{group.concept}</h2>
            <p className="mb-3 text-xs text-ink-muted">{group.usedFor}</p>
            <div className="flex flex-wrap gap-6">
              {group.variants.map((variant) => (
                <div
                  key={variant.file}
                  className="flex w-24 flex-col items-center gap-2 rounded-md border border-border p-3"
                >
                  <img src={variant.src} alt="" className="h-12 w-12" />
                  <span
                    className={`text-center text-xs break-all ${
                      variant.file === group.currentDefault
                        ? 'font-bold text-maroon'
                        : 'text-ink-muted'
                    }`}
                  >
                    {variant.file}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default IconPickerPage
