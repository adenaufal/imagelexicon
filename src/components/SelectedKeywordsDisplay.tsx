import React from 'react';
import { wordList } from '../data/wordList';

// Map keywords to their categories
const keywordToCategory: Record<string, string> = {};
Object.entries(wordList).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
        keywordToCategory[keyword] = category;
    });
});

// Get color for a category
const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
        'Character Attributes': 'bg-purple-100 text-purple-800',
        'Artists/Style References': 'bg-blue-100 text-blue-800',
        'Visual Theme': 'bg-green-100 text-green-800',
        'Setting/Environment': 'bg-yellow-100 text-yellow-800',
        'Clothing/Appearance': 'bg-pink-100 text-pink-800',
        'Physical Features': 'bg-red-100 text-red-800',
        'Expressions/Emotions': 'bg-indigo-100 text-indigo-800',
        'Visual Effects': 'bg-cyan-100 text-cyan-800',
        'Poses/Actions (SFW and NSFW)': 'bg-teal-100 text-teal-800',
        'Sexual Content/Actions': 'bg-rose-100 text-rose-800',
        'Image Quality/Technical': 'bg-amber-100 text-amber-800'
    };

    return colorMap[category] || 'bg-gray-100 text-gray-800';
};

interface SelectedKeywordsDisplayProps {
    selectedKeywords: string[];
    removeKeyword: (keyword: string) => void;
}

const SelectedKeywordsDisplay: React.FC<SelectedKeywordsDisplayProps> = ({
    selectedKeywords,
    removeKeyword
}) => {
    if (selectedKeywords.length === 0) {
        return (
            <div className="text-gray-500 italic text-center py-3">
                No keywords selected. Start by describing your vision or selecting keywords above.
            </div>
        );
    }

    // Group keywords by category
    const groupedKeywords: Record<string, string[]> = {};

    selectedKeywords.forEach(keyword => {
        const category = keywordToCategory[keyword] || 'Other';
        if (!groupedKeywords[category]) {
            groupedKeywords[category] = [];
        }
        groupedKeywords[category].push(keyword);
    });

    return (
        <div>
            <h3 className="font-medium mb-2">Selected Keywords:</h3>

            {Object.entries(groupedKeywords).map(([category, keywords]) => (
                <div key={category} className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">{category}:</div>
                    <div className="flex flex-wrap gap-2">
                        {keywords.map(keyword => (
                            <div
                                key={keyword}
                                className={`px-3 py-1 rounded-full text-sm flex items-center ${getCategoryColor(category)}`}
                            >
                                {keyword}
                                <button
                                    onClick={() => removeKeyword(keyword)}
                                    className="ml-1 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedKeywordsDisplay;