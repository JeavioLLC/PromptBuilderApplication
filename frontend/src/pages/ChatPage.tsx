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
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat History */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {chatHistory.map((message) => (
          <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {/* AI Avatar */}
            {message.role === 'ai' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
            )}

            {/* Message Bubble */}
            <div className={message.role === 'user' ? 'text-right' : ''}>
              <p className="font-semibold text-sm mb-1 text-gray-700">
                {message.role === 'ai' ? 'Prompt Builder Assistant' : 'You'}
              </p>
              <div className={`p-4 rounded-lg shadow-sm inline-block text-left max-w-2xl ${
                message.role === 'user' 
                  ? 'bg-blue-50 border border-blue-100' 
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                  {message.content}
                </div>
              </div>
              
              {/* Vote buttons for AI messages */}
              {message.role === 'ai' && (
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => rateMessage(message.id, 'upvoted')}
                    className={`p-1 rounded-md hover:bg-gray-200 transition-colors ${
                      message.feedback === 'upvoted' ? 'text-blue-600 bg-blue-100' : 'text-gray-500'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => rateMessage(message.id, 'downvoted')}
                    className={`p-1 rounded-md hover:bg-gray-200 transition-colors ${
                      message.feedback === 'downvoted' ? 'text-red-600 bg-red-100' : 'text-gray-500'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {message.role === 'user' && (
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  U
                </div>
              </div>
            )}
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isAiTyping && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prompt Input Area */}
      <div className="px-6 py-6 bg-white border-t border-gray-200">
        <div className="relative max-w-4xl mx-auto">
          {/* Recommendations Dropdown */}
          {recommendations.length > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-2 z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-500 p-3 border-b bg-gray-50">RECOMMENDATIONS</p>
              <ul>
                {recommendations.map((rec) => (
                  <li
                    key={rec.id}
                    onClick={() => selectRecommendation(rec)}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                  >
                    <p className="font-semibold text-gray-800 text-sm">{rec.title}</p>
                    <p className="text-sm text-gray-500 truncate mt-1">{rec.content}</p>
                  </li>
                ))}
              </ul>
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
              className="w-full p-4 pr-24 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none shadow-sm text-gray-800 placeholder-gray-500"
              placeholder="Enter your prompt here..."
              rows={3}
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <button
                onClick={saveCurrentPrompt}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Save current prompt to library"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={sendPrompt}
                disabled={!currentPrompt.trim() || isAiTyping}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
                title="Send prompt"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
