import { useState, useRef, useEffect } from 'react'
import { Send, Save, ThumbsUp, ThumbsDown } from 'lucide-react'
import { usePrompts } from '@/hooks/usePrompts'
import { useNavigate, useLocation } from 'react-router-dom'

interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
  feedback?: 'upvoted' | 'downvoted' | null
}

export default function ChatPage() {
  const location = useLocation()
  const [currentPrompt, setCurrentPrompt] = useState(location.state?.initialPrompt || '')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { listQuery } = usePrompts({})
  const navigate = useNavigate()

  const prompts = listQuery.data || []

  useEffect(() => {
    // Add welcome message
    setChatHistory([{
      id: '1',
      role: 'ai',
      content: 'Welcome to Prompt Builder! How can I help you today? Start typing a prompt, or I can suggest some from the library based on what you type.',
      timestamp: new Date(),
      feedback: null
    }])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isAiTyping])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  const getRecommendations = (query: string) => {
    if (query.length < 3) {
      setRecommendations([])
      return
    }
    
    const filtered = prompts.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.content.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3)
    
    setRecommendations(filtered)
  }

  const selectRecommendation = (prompt: any) => {
    setCurrentPrompt(prompt.content)
    setRecommendations([])
  }

  const sendPrompt = () => {
    if (!currentPrompt.trim() || isAiTyping) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentPrompt,
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, userMessage])
    const userPrompt = currentPrompt
    setCurrentPrompt('')
    setRecommendations([])
    setIsAiTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsAiTyping(false)
      let aiResponse = `This is a simulated response to your prompt: "${userPrompt.substring(0, 50)}..."`
      
      if (userPrompt.toLowerCase().includes('python')) {
        aiResponse = `# Simulated Python Code Response
def hello_world():
    print("Hello, Prompt Builder!")

hello_world()`
      } else if (userPrompt.toLowerCase().includes('summarize')) {
        aiResponse = `Here is a summary of your request:
• The key points are A, B, and C.
• The main action item is to follow up on topic X.`
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        feedback: null
      }

      setChatHistory(prev => [...prev, aiMessage])
    }, 2000)
  }

  const rateMessage = (messageId: string, rating: 'upvoted' | 'downvoted') => {
    setChatHistory(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, feedback: msg.feedback === rating ? null : rating }
        : msg
    ))
  }

  const saveCurrentPrompt = () => {
    if (!currentPrompt.trim()) {
      alert('Please enter a prompt before saving.')
      return
    }
    navigate('/prompts/new', { state: { initialContent: currentPrompt } })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendPrompt()
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white via-slate-50 to-blue-50/30">
      {/* Enhanced Chat Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Chat Assistant</h1>
            <p className="text-sm text-slate-600 mt-1">Start a conversation or get prompt suggestions</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-700">AI Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat History */}
      <div
        id="chat-container"
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-8 py-8 space-y-8"
      >
        {chatHistory.map((message) => (
          <div key={message.id} className={`flex items-start gap-6 ${message.role === 'user' ? 'justify-end' : ''} animate-in slide-in-from-bottom-4 duration-500`}>
            {/* AI Avatar */}
            {message.role === 'ai' && (
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-indigo-100">
                <span className="text-xl">🤖</span>
              </div>
            )}

            {/* Enhanced Message Bubble */}
            <div className={`max-w-3xl ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-slate-700">
                  {message.role === 'ai' ? 'Prompt Builder Assistant' : 'You'}
                </p>
                <span className="text-xs text-slate-500">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={`inline-block text-left prose prose-sm max-w-none transition-all duration-200 hover:shadow-md ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-3xl rounded-tr-lg shadow-lg' 
                  : 'bg-white p-6 rounded-3xl rounded-tl-lg shadow-sm border border-slate-200/60'
              }`}>
                <p className={message.role === 'user' ? 'text-white m-0' : 'text-slate-700 m-0'}>{message.content}</p>
              </div>
              
              {/* Enhanced Vote buttons for AI messages */}
              {message.role === 'ai' && (
                <div className="flex items-center space-x-3 mt-4">
                  <button
                    onClick={() => rateMessage(message.id, 'upvoted')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      message.feedback === 'upvoted' 
                        ? 'text-emerald-700 bg-emerald-100 shadow-sm' 
                        : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful</span>
                  </button>
                  <button
                    onClick={() => rateMessage(message.id, 'downvoted')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      message.feedback === 'downvoted' 
                        ? 'text-red-700 bg-red-100 shadow-sm' 
                        : 'text-slate-500 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>Not helpful</span>
                  </button>
                </div>
              )}
            </div>

            {/* Enhanced User Avatar */}
            {message.role === 'user' && (
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-2xl object-cover shadow-lg ring-2 ring-indigo-100"
                  src="https://placehold.co/100x100/4F46E5/FFFFFF?text=YOU"
                  alt="User avatar"
                />
              </div>
            )}
          </div>
        ))}

        {/* Enhanced AI Typing Indicator */}
        {isAiTyping && (
          <div className="flex items-start gap-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-indigo-100">
              <span className="text-xl">🤖</span>
            </div>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-slate-700">Prompt Builder Assistant</p>
                <span className="text-xs text-slate-500">typing...</span>
              </div>
              <div className="bg-white p-6 rounded-3xl rounded-tl-lg shadow-sm border border-slate-200/60 inline-block">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Prompt Input Area */}
      <div className="px-8 py-6 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Enhanced Recommendations Dropdown */}
            {recommendations.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-4 z-10 w-full bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <p className="text-sm font-semibold text-slate-700 flex items-center">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                    SMART SUGGESTIONS
                  </p>
                </div>
                <div className="p-2">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => selectRecommendation(rec)}
                      className="p-4 cursor-pointer hover:bg-slate-50 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200/60 hover:shadow-sm"
                    >
                      <p className="font-semibold text-slate-800 mb-1">{rec.title}</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{rec.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative">
              <textarea
                value={currentPrompt}
                onChange={(e) => {
                  setCurrentPrompt(e.target.value)
                  getRecommendations(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                className="w-full p-6 pr-32 border-2 border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all duration-200 resize-none bg-white/80 backdrop-blur-sm text-slate-700 placeholder-slate-400 shadow-sm"
                placeholder="Type your message here... Press Enter to send or Shift+Enter for new line"
                rows={3}
              />
              <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                <button
                  onClick={saveCurrentPrompt}
                  className="p-3 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 hover:text-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  title="Save current prompt to library"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={sendPrompt}
                  disabled={!currentPrompt.trim() || isAiTyping}
                  className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  title="Send prompt"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
