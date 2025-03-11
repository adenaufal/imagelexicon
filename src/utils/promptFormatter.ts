import { wordList } from '../data/wordList';

// Define a logical order for categories to ensure coherent prompts
const categoryOrder = [
    "Character Attributes",
    "Artists/Style References",
    "Visual Theme",
    "Setting/Environment",
    "Clothing/Appearance",
    "Physical Features",
    "Expressions/Emotions",
    "Poses/Actions (SFW and NSFW)",
    "Sexual Content/Actions",
    "Visual Effects",
    "Image Quality/Technical"
];

// Map keywords to their categories
const keywordToCategory: Record<string, string> = {};
Object.entries(wordList).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
        keywordToCategory[keyword] = category;
    });
});

export const formatPrompt = (
    selectedKeywords: string[],
    selectedCategories: string[]
): string => {
    if (selectedKeywords.length === 0) {
        return '';
    }

    // Filter keywords to those in selected categories, if any
    const filteredKeywords = selectedCategories.length > 0
        ? selectedKeywords.filter(keyword =>
            selectedCategories.includes(keywordToCategory[keyword] || '')
        )
        : selectedKeywords;

    // Sort keywords by category order for a coherent prompt
    const sortedKeywords = [...filteredKeywords].sort((a, b) => {
        const categoryA = keywordToCategory[a] || '';
        const categoryB = keywordToCategory[b] || '';

        const indexA = categoryOrder.indexOf(categoryA);
        const indexB = categoryOrder.indexOf(categoryB);

        return indexA - indexB;
    });

    // Some quality keywords should come at the beginning
    const qualityKeywords = sortedKeywords.filter(k =>
        k.includes('masterpiece') || k.includes('best quality') || k.includes('good quality')
    );

    // Remove quality keywords from the main list to avoid duplication
    const mainKeywords = sortedKeywords.filter(k => !qualityKeywords.includes(k));

    // Combine everything into a coherent prompt
    return [...qualityKeywords, ...mainKeywords].join(', ');
};