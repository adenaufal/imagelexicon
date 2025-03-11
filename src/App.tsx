import React, { useState } from 'react';
import KeywordSelector from './components/KeywordSelector';
import CategorySelector from './components/CategorySelector';
import InputSuggestion from './components/InputSuggestion';
import PromptGenerator from './components/PromptGenerator';
import PromptDisplay from './components/PromptDisplay';

const App: React.FC = () => {
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    const addKeyword = (keyword: string) => {
        if (!selectedKeywords.includes(keyword)) {
            setSelectedKeywords([...selectedKeywords, keyword]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    ImageLexicon - Prompt Generator
                </h1>

                <div className="mb-6">
                    <CategorySelector
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                </div>

                <div className="mb-6">
                    <KeywordSelector
                        selectedKeywords={selectedKeywords}
                        setSelectedKeywords={setSelectedKeywords}
                        selectedCategories={selectedCategories}
                    />
                </div>

                <div className="mb-6">
                    <InputSuggestion addKeyword={addKeyword} />
                </div>

                <div className="mb-6">
                    <PromptGenerator
                        selectedKeywords={selectedKeywords}
                        selectedCategories={selectedCategories}
                        setGeneratedPrompt={setGeneratedPrompt}
                    />
                </div>

                <div>
                    <PromptDisplay generatedPrompt={generatedPrompt} />
                </div>
            </div>
        </div>
    );
};

export default App;