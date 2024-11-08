import { GroupingField } from '../types/fruit'

interface GroupBySelectorProps {
  groupBy: GroupingField
  setGroupBy: (value: GroupingField) => void
}

export function GroupBySelector({ groupBy, setGroupBy }: GroupBySelectorProps) {
  const groupingOptions = {
    none: 'None',
    family: 'Family',
    order: 'Order',
    genus: 'Genus',
  }

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="grouping" className="text-sm font-medium text-gray-700">
        Group by:
      </label>
      <select
        id="grouping"
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value as GroupingField)}
        className="block w-32 rounded-md border-gray-300 py-1.5 text-sm 
          focus:border-indigo-500 focus:ring-indigo-500"
      >
        {Object.entries(groupingOptions).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
