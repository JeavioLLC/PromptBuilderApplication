import { useMemo, useState } from 'react'
import { Button, Form, Input, Modal, Space, Table, Typography } from 'antd'
import { useCategories } from '@/hooks/useCategories'
import type { Category } from '@/api/types'

export default function CategoriesPage() {
  const { categoriesQuery, createMutation, updateMutation, deleteMutation } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form] = Form.useForm()

  const data = categoriesQuery.data || []
  const loading = categoriesQuery.isLoading

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setIsModalOpen(true)
  }
  const openEdit = (record: Category) => {
    setEditing(record)
    form.setFieldsValue({ name: record.name, description: record.description })
    setIsModalOpen(true)
  }
  const onDelete = (record: Category) => {
    Modal.confirm({
      title: 'Delete category?',
      content: `Are you sure you want to delete "${record.name}"?`,
      onOk: () => deleteMutation.mutate(record.id),
    })
  }

  const onSubmit = async () => {
    const values = await form.validateFields()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: values })
    } else {
      createMutation.mutate(values)
    }
    setIsModalOpen(false)
  }

  const columns = useMemo(
    () => [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Description', dataIndex: 'description' },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, record: Category) => (
          <Space>
            <Button size="small" onClick={() => openEdit(record)}>Edit</Button>
            <Button size="small" danger onClick={() => onDelete(record)}>Delete</Button>
          </Space>
        ),
      },
    ],
    []
  )

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreate}>New Category</Button>
      </Space>
      <Table<Category>
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns as any}
      />

      <Modal
        title={editing ? 'Edit Category' : 'New Category'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={onSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}


