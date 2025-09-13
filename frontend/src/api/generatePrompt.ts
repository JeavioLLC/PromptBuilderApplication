export async function generatePrompt(context: string): Promise<string> {
  const res = await fetch('/api/generate-prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context })
  });
  if (!res.ok) {
    throw new Error('Failed to generate prompt');
  }
  const data = await res.json();
  return data.prompt;
}
