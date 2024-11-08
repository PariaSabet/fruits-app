import { ViewType } from '../types/fruit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTable } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

interface ViewSelectorProps {
  view: ViewType
  setView: (view: ViewType) => void
}

export function ViewSelector({ view, setView }: ViewSelectorProps) {
  const tabVariants = {
    active: {
      backgroundColor: 'rgb(224 231 255)', // indigo-100
      color: 'rgb(67 56 202)', // indigo-700
      transition: { duration: 0.2 },
    },
    inactive: {
      backgroundColor: 'transparent',
      color: 'rgb(107 114 128)', // gray-500
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="flex space-x-1 rounded-lg p-1">
      <motion.button
        variants={tabVariants}
        animate={view === 'list' ? 'active' : 'inactive'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setView('list')}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          flex items-center space-x-2
          ${
            view === 'list'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <FontAwesomeIcon icon={faList} className="h-4 w-4" />
        <span>List</span>
      </motion.button>
      <motion.button
        variants={tabVariants}
        animate={view === 'table' ? 'active' : 'inactive'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setView('table')}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          flex items-center space-x-2
          ${
            view === 'table'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <FontAwesomeIcon icon={faTable} className="h-4 w-4" />
        <span>Table</span>
      </motion.button>
    </div>
  )
}
