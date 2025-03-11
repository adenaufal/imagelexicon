import React from 'react';
import { getRecommendedKeywords } from '../utils/keywordRecommender';

interface KeywordRecommendationsProps {
    selectedKeywords: string[];
    addKeyword: (keyword: string) => void;
}

const KeywordRecommendations: React.FC<KeywordRecommendationsProps> = ({
    selectedKeywords,
    addKeyword
}) => {
    // Only show recommendations if there are selected keywords
    if (selectedKeywords.length === 0) {
        return null;
    }

    const recommendations = getRecommendedKeywords(selectedKeywords);

    // Don't show recommendations that are already selected
    const filteredRecommendations = recommendations.filter(
        rec => !selectedKeywords.includes(rec)
    );

    if (filteredRecommendations.length === 0) {
        return null;
    }

    return (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Recommended Keywords:</h3>
            <div className="flex flex-wrap gap-2">
                {filteredRecommendations.map(keyword => (
                    <button
                        key={keyword}
                        onClick={() => addKeyword(keyword)}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-full text-sm flex items-center"
                    >
                        <span className="mr-1">+</span> {keyword}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default KeywordRecommendations;