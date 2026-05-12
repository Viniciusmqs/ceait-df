import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Props {
  onAdd: () => void
  onEdit?: () => void
  onDelete?: () => void
  addLabel?: string
  editLabel?: string
  deleteLabel?: string
  hasSelection?: boolean
}

export default function CrudToolbar({
  onAdd, onEdit, onDelete,
  addLabel = 'Adicionar',
  editLabel = 'Editar',
  deleteLabel = 'Excluir',
  hasSelection = false,
}: Props) {
  return (
    <div className="crud-toolbar">
      <button onClick={onAdd} className="btn-green text-xs py-1.5 px-3 gap-1.5">
        <Plus size={14} /> {addLabel}
      </button>
      {onEdit && (
        <button
          onClick={onEdit}
          disabled={!hasSelection}
          className="btn-navy text-xs py-1.5 px-3 gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Pencil size={14} /> {editLabel}
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          disabled={!hasSelection}
          className="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg font-cond font-800 uppercase tracking-wide bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={14} /> {deleteLabel}
        </button>
      )}
    </div>
  )
}
