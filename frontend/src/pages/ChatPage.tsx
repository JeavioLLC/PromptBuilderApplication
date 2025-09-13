import { useState, useRef, useEffect } from 'react'
import { Send, Save, ThumbsUp, ThumbsDown } from 'lucide-react'
import { usePrompts } from '@/hooks/usePrompts'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/ui/Button'

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

    const filtered = prompts.filter(prompt => 
      prompt.title.toLowerCase().includes(query.toLowerCase()) ||
      prompt.content.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3)

    setRecommendations(filtered)
  }

  const sendPrompt = () => {
    if (!currentPrompt.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentPrompt,
      timestamp: new Date(),
      feedback: null
    }

    setChatHistory(prev => [...prev, userMessage])
    setCurrentPrompt('')
    setRecommendations([])
    setIsAiTyping(true)

    setTimeout(() => {
      setIsAiTyping(false)
      const responses = [
        "That's an interesting prompt! Here are some suggestions to make it more effective...",
        "I can help you refine that prompt. Consider adding more context about your target audience.",
        "Great prompt! You might want to specify the format you're looking for in the response.",
        "This prompt has good potential. Let me suggest some improvements to make it more specific."
      ]
      
      const aiResponse = responses[Math.floor(Math.random() * responses.length)]
      
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
    <div className="h-full flex flex-col bg-secondary">
      {/* Clean Chat Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title" style={{ fontSize: '24px' }}>AI Chat Assistant</h1>
            <p className="page-subtitle">Start a conversation or get prompt suggestions</p>
          </div>
          <div className="status-indicator status-indicator--online">
            <div className="status-indicator__dot" />
            <span>AI Online</span>
          </div>
        </div>
      </div>

      {/* Clean Chat History */}
      <div ref={chatContainerRef} className="chat-container">
        {chatHistory.map((message) => (
          <div key={message.id} className={`chat-message ${message.role === 'user' ? 'chat-message--user' : ''}`}>
            {/* AI Avatar */}
            {message.role === 'ai' && (
              <div className="chat-avatar chat-avatar--ai">🤖</div>
            )}

            {/* Clean Message Bubble */}
            <div className="chat-bubble">
              <div className="chat-bubble__header" style={{ justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <p className="chat-bubble__name">
                  {message.role === 'ai' ? 'Assistant' : 'You'}
                </p>
                <span className="chat-bubble__time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className={`chat-bubble__content ${message.role === 'user' ? 'chat-bubble__content--user' : 'chat-bubble__content--ai'}`}>
                <p className="chat-bubble__text">{message.content}</p>
              </div>
              
              {/* Clean Vote buttons for AI messages */}
              {message.role === 'ai' && (
                <div className="chat-actions">
                  <button
                    onClick={() => rateMessage(message.id, 'upvoted')}
                    className={`chat-action ${message.feedback === 'upvoted' ? 'chat-action--active-positive' : ''}`}
                  >
                    <ThumbsUp size={14} />
                    <span>Helpful</span>
                  </button>
                  <button
                    onClick={() => rateMessage(message.id, 'downvoted')}
                    className={`chat-action ${message.feedback === 'downvoted' ? 'chat-action--active-negative' : ''}`}
                  >
                    <ThumbsDown size={14} />
                    <span>Not helpful</span>
                  </button>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {message.role === 'user' && (
              <img
                className="chat-avatar chat-avatar--user"
                src="https://placehold.co/100x100/4a90a4/FFFFFF?text=YOU"
                alt="User avatar"
              />
            )}
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isAiTyping && (
          <div className="chat-message">
            <div className="chat-avatar chat-avatar--ai">🤖</div>
            <div className="card card--padding-md">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.16s' }} />
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.32s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clean Input Area */}
      <div className="page-header border-t">
        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="card card--padding-md mb-4">
            <p className="text-sm font-medium text-secondary mb-3">Suggested prompts:</p>
            <div className="flex flex-col gap-2">
              {recommendations.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => setCurrentPrompt(prompt.content)}
                  className="text-left p-3 bg-card border rounded cursor-pointer transition text-sm text-primary hover:bg-hover"
                >
                  {prompt.title}
                </button>
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
            placeholder="Type your prompt here... Press Enter to send, Shift+Enter for new line"
            className="form-input form-textarea"
            style={{ paddingRight: '120px' }}
          />
          
          <div className="absolute right-3 top-3 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={saveCurrentPrompt}
              disabled={!currentPrompt.trim()}
            >
              <Save size={16} />
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={sendPrompt}
              disabled={!currentPrompt.trim()}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}