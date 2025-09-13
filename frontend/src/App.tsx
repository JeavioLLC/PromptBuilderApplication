import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DashboardPage from './pages/DashboardPage.tsx'
import CategoriesPage from './pages/CategoriesPage.tsx'
import PromptsPage from './pages/PromptsPage.tsx'
import PromptFormPage from './pages/PromptFormPage.tsx'
import ChatPage from './pages/ChatPage.tsx'

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


