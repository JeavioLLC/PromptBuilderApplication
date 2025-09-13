export interface Category {
  id: number
  name: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface CategoryFormData {
  name: string
  description: string
}

export interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category?: Category | null
  onSubmit: (data: CategoryFormData) => void
}

export interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
  index?: number
}

export interface DeleteConfirmationProps {
  isOpen: boolean
  onClose: () => void
  category: Category | null
  onConfirm: () => void
}
