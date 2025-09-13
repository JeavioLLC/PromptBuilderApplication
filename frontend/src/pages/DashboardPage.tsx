import React from 'react'
import { BarChart3, Users, FileText, TrendingUp, Activity } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Card from '../components/ui/Card'
import PageLayout from '../components/layout/PageLayout'
import PageHeader from '../components/layout/PageHeader'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'var(--primary)'
    },
    {
      title: 'Active Sessions',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      color: 'var(--success)'
    },
    {
      title: 'Documents',
      value: '456',
      change: '-2%',
      trend: 'down',
      icon: FileText,
      color: 'var(--warning)'
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'var(--info)'
    }
  ]

  const recentActivity = [
    { id: 1, action: 'User registration', user: 'john@example.com', time: '2 minutes ago' },
    { id: 2, action: 'Document uploaded', user: 'sarah@example.com', time: '5 minutes ago' },
    { id: 3, action: 'Profile updated', user: 'mike@example.com', time: '10 minutes ago' },
    { id: 4, action: 'New session started', user: 'emma@example.com', time: '15 minutes ago' },
    { id: 5, action: 'Password changed', user: 'alex@example.com', time: '20 minutes ago' }
  ]

  return (
    <PageLayout>
      <PageHeader
        icon={<BarChart3 size={20} style={{ color: 'var(--primary)' }} />}
        title={`Welcome back, ${user?.name || 'User'}!`}
        subtitle="Here's what's happening with your application today"
      />

      {/* Stats Grid */}
      <div className="grid-auto-fit mb-8">
        {stats.map((stat, index) => (
          <Card key={index} padding="md" hoverable>
            <div className="flex items-center justify-between mb-4">
              <div className="page-icon" style={{ background: `${stat.color}15`, borderColor: `${stat.color}30` }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-1">{stat.value}</h3>
              <p className="text-sm text-secondary">{stat.title}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Placeholder */}
        <Card padding="md">
          <div className="card-header">
            <h3 className="card-title">Analytics Overview</h3>
            <p className="card-subtitle">Last 30 days performance</p>
          </div>
          
          <div className="flex items-center justify-center h-64 bg-secondary rounded-lg">
            <div className="text-center">
              <BarChart3 size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
              <p className="text-muted">Chart visualization would go here</p>
              <p className="text-sm text-muted mt-2">Connect your analytics service to see real data</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card padding="md">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <p className="card-subtitle">Latest user actions</p>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-secondary truncate">
                    {activity.user}
                  </p>
                </div>
                <div className="text-xs text-muted flex-shrink-0">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t text-center">
            <button className="text-sm font-medium transition-colors" style={{ color: 'var(--primary)' }}>
              View all activity
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card padding="md" className="mt-8">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
          <p className="card-subtitle">Common tasks and shortcuts</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add User', icon: Users },
            { label: 'Upload File', icon: FileText },
            { label: 'View Reports', icon: BarChart3 },
            { label: 'Settings', icon: Activity }
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-hover transition-colors cursor-pointer"
            >
              <action.icon size={24} style={{ color: 'var(--primary)' }} />
              <span className="text-sm font-medium text-secondary">{action.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </PageLayout>
  )
}

export default DashboardPage