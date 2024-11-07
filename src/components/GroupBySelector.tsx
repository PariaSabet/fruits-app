import { GroupingField } from '../types/fruit'

interface GroupBySelectorProps {
  groupBy: GroupingField
  setGroupBy: (value: GroupingField) => void
}

export function GroupBySelector({ groupBy, setGroupBy }: GroupBySelectorProps) {
  return (
    <div className="mb-4">
      <label htmlFor="groupBy" className="mr-2 font-medium">
        Group by:
      </label>
      <select
        id="groupBy"
        value={groupBy}
        onChange={(e) => setGroupBy(e.target.value as GroupingField)}
        className="border rounded px-2 py-1"
      >
        <option value="none">None</option>
        <option value="family">Family</option>
        <option value="order">Order</option>
        <option value="genus">Genus</option>
      </select>
    </div>
  )
}
