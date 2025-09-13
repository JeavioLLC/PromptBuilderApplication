import { Card, Col, Row, Statistic, Table, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { fetchStats } from '@/api/stats'
import type { Prompt, StatsResponse } from '@/api/types'

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery<StatsResponse>({ queryKey: ['stats'], queryFn: fetchStats })

  if (error) {
    return <Typography.Text type="danger">{String(error)}</Typography.Text>
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Card><Statistic title="Categories" value={data?.overview.total_categories || 0} /></Card>
          </Col>
          <Col xs={24} md={8}>
            <Card><Statistic title="Prompts" value={data?.overview.total_prompts || 0} /></Card>
          </Col>
          <Col xs={24} md={8}>
            <Card loading={isLoading}><Statistic title="Total Usage" value={data?.overview.total_usage || 0} /></Card>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card title="Most Used Prompts" loading={isLoading}>
          <Table<Prompt>
            rowKey="id"
            dataSource={data?.most_used_prompts || []}
            pagination={false}
            columns={[
              { title: 'Title', dataIndex: 'title' },
              { title: 'Category', dataIndex: 'category_name' },
              { title: 'Usage', dataIndex: 'usage_count' },
            ]}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Recent Prompts" loading={isLoading}>
          <Table<Prompt>
            rowKey="id"
            dataSource={data?.recent_prompts || []}
            pagination={false}
            columns={[
              { title: 'Title', dataIndex: 'title' },
              { title: 'Category', dataIndex: 'category_name' },
              { title: 'Updated', dataIndex: 'updated_at' },
            ]}
          />
        </Card>
      </Col>
    </Row>
  )
}


