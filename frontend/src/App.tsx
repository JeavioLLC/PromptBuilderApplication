import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Home, Library, FolderOpen } from 'lucide-react'
import DashboardPage from './pages/DashboardPage'
import CategoriesPage from './pages/CategoriesPage'
import PromptsPage from './pages/PromptsPage'
import PromptFormPage from './pages/PromptFormPage'
import ChatPage from './pages/ChatPage'


function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const selectedKeys = [
    location.pathname === '/'
      ? 'home'
      : location.pathname.startsWith('/categories')
      ? 'categories'
      : location.pathname.startsWith('/prompts')
      ? 'prompts'
      : 'home',
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Prompt Builder</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link
            to="/"
            className={`nav-item flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors ${
              selectedKeys[0] === 'home' ? 'active bg-gray-200 text-gray-900 font-medium' : ''
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
          <Link
            to="/prompts"
            className={`nav-item flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors ${
              selectedKeys[0] === 'prompts' ? 'active bg-gray-200 text-gray-900 font-medium' : ''
            }`}
          >
            <Library className="w-5 h-5 mr-3" />
            Prompt Library
          </Link>
          <Link
            to="/categories"
            className={`nav-item flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors ${
              selectedKeys[0] === 'categories' ? 'active bg-gray-200 text-gray-900 font-medium' : ''
            }`}
          >
            <FolderOpen className="w-5 h-5 mr-3" />
            Categories
          </Link>
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              U
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/prompts/new" element={<PromptFormPage />} />
          <Route path="/prompts/:id" element={<PromptFormPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}


