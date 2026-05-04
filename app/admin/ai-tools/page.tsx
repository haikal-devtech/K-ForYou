'use client';

import { useState } from 'react';
import { generateProductDescription } from '@/lib/gemini';
import { Loader2, Wand2 } from 'lucide-react';

export default function AIToolsPage() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const template = `
        You are an expert product copywriter for an Indonesian diaspora marketplace called "K-For You".
        Generate an enticing response for the following product details.
        
        Details: ${prompt}
        
        Respond with a JSON object containing:
        {
           "shortDescription": "1 sentence enticing summary",
           "diasporaStory": "1 paragraph story connecting this item to Indonesian culture and diaspora nostalgia (italic tone)",
           "seoTitle": "catchy SEO title",
           "seoDescription": "SEO meta description under 160 characters",
           "tags": ["tag1", "tag2", "tag3"]
        }
      `;
      const result = await generateProductDescription(template);
      setOutput(result || 'No output from Gemini');
    } catch (error: any) {
      setOutput('Error generating description: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Product Assistant</h1>
        <p className="text-gray-500">Generate engaging product copy and diaspora stories instantly using Google Gemini.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-8">
         <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-accent-green" /> Product Details
         </h2>
         <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder="E.g. Indomie Goreng, Category: Food, Origin: Jakarta. It's the classic instant noodle."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green mb-6"
         />
         <button 
           onClick={handleGenerate}
           disabled={loading || !prompt}
           className="px-6 py-3 bg-primary-navy hover:bg-accent-green text-white font-medium rounded-lg transition disabled:opacity-50 flex items-center gap-2"
         >
           {loading && <Loader2 className="w-5 h-5 animate-spin" />}
           Generate Copy
         </button>
      </div>

      {output && (
        <div className="bg-[#1A1A1A] text-[#FAFAF7] rounded-xl p-8 border border-gray-800 shadow-sm font-mono text-sm overflow-x-auto whitespace-pre-wrap">
          <h2 className="text-lg font-sans font-bold text-white mb-4">Gemini Output JSON</h2>
          {output}
        </div>
      )}
    </div>
  );
}
