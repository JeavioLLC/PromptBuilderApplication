import { useEffect } from 'react'
import { Button, Card, Form, Input, Select, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { usePrompts } from '@/hooks/usePrompts'
import { useCategories } from '@/hooks/useCategories'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  category_id: z.number(),
})

type FormValues = z.infer<typeof schema>

export default function PromptFormPage() {
  const params = useParams<{ id: string }>()
  const id = params.id ? Number(params.id) : undefined
  const navigate = useNavigate()
  const { getById, createMutation, updateMutation } = usePrompts()
  const promptQuery = id ? getById(id) : undefined
  const { categoriesQuery } = useCategories()
  const [form] = Form.useForm<FormValues>()

  useEffect(() => {
    if (promptQuery?.data) {
      const p = promptQuery.data
      form.setFieldsValue({ title: p.title, content: p.content, category_id: p.category_id })
    }
  }, [promptQuery?.data, form])

  const onSubmit = async () => {
    const raw = await form.validateFields()
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
      return
    }
    const values = parsed.data
    if (id) {
      updateMutation.mutate(
        { id, input: values },
        { onSuccess: () => navigate('/prompts') }
      )
    } else {
      createMutation.mutate(values, { onSuccess: () => navigate('/prompts') })
    }
  }

  const isLoading = Boolean(id && promptQuery?.isLoading)

  return (
    <Card title={id ? 'Edit Prompt' : 'New Prompt'} loading={isLoading}>
      <Form layout="vertical" form={form}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}> 
          <Input.TextArea rows={8} placeholder="Use {variable} syntax to define variables" />
        </Form.Item>
        <Form.Item name="category_id" label="Category" rules={[{ required: true }]}> 
          <Select
            options={(categoriesQuery.data || []).map((c) => ({ value: c.id, label: c.name }))}
          />
        </Form.Item>
        <Space>
          <Button type="primary" onClick={onSubmit} loading={createMutation.isPending || updateMutation.isPending}>Save</Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Space>
      </Form>
    </Card>
  )
}


