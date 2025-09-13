import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Layout, Menu, Typography } from 'antd'
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import DashboardPage from './pages/DashboardPage'
import CategoriesPage from './pages/CategoriesPage'
import PromptsPage from './pages/PromptsPage'
import PromptFormPage from './pages/PromptFormPage'

const { Header, Sider, Content, Footer } = Layout

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const selectedKeys = [
    location.pathname.startsWith('/categories')
      ? 'categories'
      : location.pathname.startsWith('/prompts')
      ? 'prompts'
      : 'dashboard',
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">Prompt Builder</div>
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="categories" icon={<AppstoreOutlined />}>
            <Link to="/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="prompts" icon={<FileTextOutlined />}>
            <Link to="/prompts">Prompts</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Prompt Builder
          </Typography.Title>
        </Header>
        <Content style={{ margin: '24px' }}>
          <div className="content-card">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Prompt Builder © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/prompts/new" element={<PromptFormPage />} />
          <Route path="/prompts/:id" element={<PromptFormPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}


