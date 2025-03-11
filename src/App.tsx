import React, { useState } from 'react';
import KeywordSelector from './components/KeywordSelector';
import CategorySelector from './components/CategorySelector';
import InputSuggestion from './components/InputSuggestion';
import PromptGenerator from './components/PromptGenerator';
import PromptDisplay from './components/PromptDisplay';
import DescriptionInput from './components/DescriptionInput';
import KeywordRecommendations from './components/KeywordRecommendations';
import SelectedKeywordsDisplay from './components/SelectedKeywordsDisplay';
import Footer from './components/Footer'; // Tambahkan import ini

const App: React.FC = () => {
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    const addKeyword = (keyword: string) => {
        if (!selectedKeywords.includes(keyword)) {
            setSelectedKeywords([...selectedKeywords, keyword]);
        }
    };

    const removeKeyword = (keywordToRemove: string) => {
        setSelectedKeywords(selectedKeywords.filter(keyword => keyword !== keywordToRemove));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-grow py-8">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        ImageLexicon
                    </h1>

                    {/* Konten aplikasi yang sudah ada */}
                    <DescriptionInput
                        setSelectedKeywords={setSelectedKeywords}
                        setSelectedCategories={setSelectedCategories}
                    />

                    <div className="bg-white p-5 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-bold mb-4">
                            <span className="text-purple-600 mr-2">2</span>Review & Customize
                        </h2>

                        <div className="mb-4">
                            <SelectedKeywordsDisplay
                                selectedKeywords={selectedKeywords}
                                removeKeyword={removeKeyword}
                            />
                        </div>

                        <div className="mb-4">
                            <CategorySelector
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                            />
                        </div>

                        <div className="mb-4">
                            <KeywordSelector
                                selectedKeywords={selectedKeywords}
                                setSelectedKeywords={setSelectedKeywords}
                                selectedCategories={selectedCategories}
                            />
                            <KeywordRecommendations
                                selectedKeywords={selectedKeywords}
                                addKeyword={addKeyword}
                            />
                        </div>

                        <div className="mb-4">
                            <InputSuggestion addKeyword={addKeyword} />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-bold mb-4">
                            <span className="text-purple-600 mr-2">3</span>Generate Your Prompt
                        </h2>

                        <div className="mb-4">
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
            </div>

            {/* Tambahkan Footer komponen di sini */}
            <Footer />
        </div>
    );
};

export default App;