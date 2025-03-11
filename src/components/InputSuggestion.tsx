import React, { useState, useEffect } from 'react';
import { wordList } from '../data/wordList';

interface InputSuggestionProps {
    addKeyword: (keyword: string) => void;
}

const InputSuggestion: React.FC<InputSuggestionProps> = ({ addKeyword }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const allKeywords = Object.values(wordList).flat();

    useEffect(() => {
        if (input.length > 1) {
            const filtered = allKeywords.filter(
                keyword => keyword.toLowerCase().includes(input.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [input]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSuggestionClick = (suggestion: string) => {
        addKeyword(suggestion);
        setInput('');
        setSuggestions([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() !== '') {
            addKeyword(input.trim());
            setInput('');
        }
    };

    return (
        <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Custom Keywords
            </label>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                    placeholder="Type to add or search..."
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                >
                    Add
                </button>
            </form>
            {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputSuggestion;