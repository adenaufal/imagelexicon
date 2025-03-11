import React from 'react';

interface PromptDisplayProps {
    generatedPrompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ generatedPrompt }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPrompt);
        alert('Prompt copied to clipboard!');
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Generated Prompt
            </label>
            {generatedPrompt ? (
                <div className="relative">
                    <div className="p-4 bg-gray-100 rounded-md min-h-[100px] break-words">
                        {generatedPrompt}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-600"
                    >
                        Copy
                    </button>
                </div>
            ) : (
                <div className="p-4 bg-gray-100 rounded-md min-h-[100px] flex items-center justify-center text-gray-500">
                    Your generated prompt will appear here
                </div>
            )}
        </div>
    );
};

export default PromptDisplay;