import React from 'react';
import { formatPrompt } from '../utils/promptFormatter';

interface PromptGeneratorProps {
    selectedKeywords: string[];
    selectedCategories: string[];
    setGeneratedPrompt: (prompt: string) => void;
}

const PromptGenerator: React.FC<PromptGeneratorProps> = ({
    selectedKeywords,
    selectedCategories,
    setGeneratedPrompt
}) => {
    const handleGenerateClick = () => {
        const prompt = formatPrompt(selectedKeywords, selectedCategories);
        setGeneratedPrompt(prompt);
    };

    return (
        <div className="mb-4">
            <button
                onClick={handleGenerateClick}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 w-full"
                disabled={selectedKeywords.length === 0}
            >
                Generate Prompt
            </button>
            {selectedKeywords.length === 0 && (
                <p className="text-red-500 text-sm mt-1">
                    Please select at least one keyword
                </p>
            )}
        </div>
    );
};

export default PromptGenerator;