import React from 'react';
import Select from 'react-select';
import { wordList } from '../data/wordList';

interface KeywordSelectorProps {
    selectedKeywords: string[];
    setSelectedKeywords: (keywords: string[]) => void;
    selectedCategories: string[];
}

const KeywordSelector: React.FC<KeywordSelectorProps> = ({
    selectedKeywords,
    setSelectedKeywords,
    selectedCategories
}) => {
    // Only show keywords from selected categories or all if none selected
    const availableKeywords = selectedCategories.length === 0
        ? Object.values(wordList).flat()
        : selectedCategories.flatMap(category => wordList[category] || []);

    const options = availableKeywords.map(keyword => ({
        value: keyword,
        label: keyword
    }));

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Keywords
            </label>
            <Select
                isMulti
                options={options}
                value={selectedKeywords.map(k => ({ value: k, label: k }))}
                onChange={(selected) =>
                    setSelectedKeywords(selected.map(option => option.value))
                }
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );
};

export default KeywordSelector;