import React, { useState } from 'react';
import { analyzeDescription } from '../utils/descriptionAnalyzer';

interface DescriptionInputProps {
    setSelectedKeywords: (keywords: string[]) => void;
    setSelectedCategories: (categories: string[]) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
    setSelectedKeywords,
    setSelectedCategories
}) => {
    const [description, setDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const processDescription = async () => {
        if (!description.trim()) return;

        setIsProcessing(true);

        try {
            // Analyze the description and get keywords and categories
            const { keywords, categories } = await analyzeDescription(description);

            // Update the selected keywords and categories
            setSelectedKeywords(keywords);
            setSelectedCategories(categories);
        } catch (error) {
            console.error('Error processing description:', error);
            // You could show an error message to the user here
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="mb-6 bg-white p-5 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
                <span className="text-purple-600 mr-2">1</span>Describe Your Vision
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us what you want to create:
            </label>
            <textarea
                className="w-full p-3 border rounded-lg shadow-inner min-h-[100px]"
                placeholder="Example: original character with white hair posing in a half-body illustration"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                className="mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full md:w-auto"
                onClick={processDescription}
                disabled={isProcessing || !description.trim()}
            >
                {isProcessing ? 'Processing...' : 'Generate Keywords'}
            </button>
        </div>
    );
};

export default DescriptionInput;