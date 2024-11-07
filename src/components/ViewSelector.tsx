import { ViewType } from '../types/fruit'

interface ViewSelectorProps {
  view: ViewType
  setView: (view: ViewType) => void
}

export function ViewSelector({ view, setView }: ViewSelectorProps) {
  return (
    <div className="mb-4 flex gap-2">
      <button
        className={`px-3 py-1 rounded ${
          view === 'list'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={() => setView('list')}
      >
        List
      </button>
      <button
        className={`px-3 py-1 rounded ${
          view === 'table'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={() => setView('table')}
      >
        Table
      </button>
    </div>
  )
}
