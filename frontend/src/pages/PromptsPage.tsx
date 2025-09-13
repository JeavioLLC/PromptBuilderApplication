import { useMemo, useState } from 'react'
import { Button, Input, Select, Space, Table, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { usePrompts } from '@/hooks/usePrompts'
import { useCategories } from '@/hooks/useCategories'
import type { Prompt } from '@/api/types'

export default function PromptsPage() {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const navigate = useNavigate()
  const { listQuery, deleteMutation } = usePrompts({ search, category_id: categoryId })
  const { categoriesQuery } = useCategories()

  const data = listQuery.data || []
  const loading = listQuery.isLoading

  const columns = useMemo(
    () => [
      { title: 'Title', dataIndex: 'title' },
      { title: 'Category', dataIndex: 'category_name' },
      { title: 'Variables', dataIndex: 'variables', render: (vars: string[]) => vars?.join(', ') },
      { title: 'Usage', dataIndex: 'usage_count' },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, record: Prompt) => (
          <Space>
            <Link to={`/prompts/${record.id}`}>Edit</Link>
            <Button size="small" danger onClick={() => deleteMutation.mutate(record.id)}>Delete</Button>
          </Space>
        ),
      },
    ],
    [deleteMutation]
  )

  return (
    <div>
      <Space wrap style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search prompts"
          allowClear
          onSearch={setSearch}
          style={{ width: 280 }}
        />
        <Select
          placeholder="Filter by category"
          allowClear
          style={{ width: 240 }}
          options={(categoriesQuery.data || []).map((c) => ({ value: c.id, label: c.name }))}
          onChange={(val) => setCategoryId(val)}
        />
        <Button type="primary" onClick={() => navigate('/prompts/new')}>New Prompt</Button>
      </Space>
      <Table<Prompt>
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns as any}
      />
    </div>
  )
}


