import React, { useState, useRef, useEffect } from 'react';

interface Message {
	id: number;
	sender: 'assistant' | 'user';
	text: string;
}

const initialMessages: Message[] = [
	{
		id: 1,
		sender: 'assistant',
		text: 'Welcome to Sarathi! How can I help you today? Start typing a prompt, or I can suggest some from the library based on what you type.'
	}
];

const ChatHome: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [input, setInput] = useState('');
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSend = () => {
		if (!input.trim()) return;
		setMessages(prev => [
			...prev,
			{ id: prev.length + 1, sender: 'user', text: input }
		]);
		setInput('');
		// Here you can add logic to get assistant response
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSend();
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f7f8fa' }}>
			<div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
				{messages.map(msg => (
					<div key={msg.id} style={{
						display: 'flex',
						justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
						marginBottom: 16
					}}>
						<div style={{
							background: msg.sender === 'assistant' ? '#fff' : '#e3e8f0',
							color: '#222',
							borderRadius: 12,
							padding: '16px 20px',
							maxWidth: 480,
							boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
							fontSize: 16
						}}>
							{msg.text}
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<div style={{ padding: 24, borderTop: '1px solid #e5e7eb', background: '#f7f8fa', display: 'flex', alignItems: 'center' }}>
				<input
					type="text"
					placeholder="Enter your prompt here..."
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					style={{
						flex: 1,
						padding: '14px 16px',
						borderRadius: 8,
						border: '1px solid #d1d5db',
						fontSize: 16,
						outline: 'none',
						marginRight: 12,
						background: '#fff'
					}}
				/>
				<button
					onClick={handleSend}
					style={{
						background: '#3b82f6',
						color: '#fff',
						border: 'none',
						borderRadius: 8,
						padding: '12px 18px',
						fontWeight: 600,
						fontSize: 16,
						cursor: 'pointer',
						transition: 'background 0.2s',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
				</button>
			</div>
		</div>
	);
}

export default ChatHome;
