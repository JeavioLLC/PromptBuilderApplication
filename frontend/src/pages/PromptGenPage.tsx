import React, { useState } from 'react';
import { generatePrompt } from '../api/generatePrompt';
import Button from '../components/ui/Button';

const PromptGenPage: React.FC = () => {
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult('');
    setLoading(true);
    try {
      const prompt = await generatePrompt(context);
      setResult(prompt);
    } catch (err: any) {
      setError(err.message || 'Error generating prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Gemini Prompt Generator</h2>
      <form onSubmit={handleGenerate}>
        <textarea
          className="form-input w-full mb-4"
          rows={4}
          placeholder="Describe what you want to do (in plain English)"
          value={context}
          onChange={e => setContext(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" loading={loading} disabled={loading || !context.trim()} className="w-full">
          Generate Prompt
        </Button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded border text-gray-800">
          <div className="font-semibold mb-2">Generated Prompt:</div>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
};

export default PromptGenPage;
