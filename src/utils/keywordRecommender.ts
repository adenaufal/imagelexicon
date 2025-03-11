import { wordList } from '../data/wordList';

// Simplified recommendation system based on predefined pairs and categories
const keywordPairs: Record<string, string[]> = {
    // Character Attributes pairs
    "1boy": ["handsome", "male focus", "solo"],
    "1girl": ["beautiful", "female focus", "solo"],

    // Artist pairs
    "enosan": ["beautiful lighting", "detailed"],
    "(shirabi:1.2)": ["detailed illustration", "vibrant colors"],

    // Style pairs
    "photorealistic": ["detailed", "high quality", "realistic"],
    "white theme": ["bright", "clean background", "minimalist"],

    // Physical features
    "huge breasts": ["cleavage", "breast emphasis"],
    "white hair": ["silver eyes", "pale skin"],
    "pink hair": ["pink eyes", "cute"],

    // Setting pairs
    "bathroom": ["tile wall", "shower", "steam"],
    "against glass": ["condensation", "hand on glass"],

    // Quality pairs (always good to add these)
    "masterpiece": ["best quality", "high quality"],
    "best quality": ["masterpiece", "high quality"],
};

// Get keywords from the same category
const getSameCategoryKeywords = (category: string, count: number = 3): string[] => {
    const categoryKeywords = wordList[category] || [];
    // Randomly select 'count' keywords from the category
    return categoryKeywords
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
};

export const getRecommendedKeywords = (selectedKeywords: string[], maxRecommendations: number = 6): string[] => {
    const recommendations: string[] = [];

    // Add recommendations based on predefined pairs
    selectedKeywords.forEach(keyword => {
        if (keywordPairs[keyword]) {
            recommendations.push(...keywordPairs[keyword]);
        }
    });

    // Add recommendations from same categories of selected keywords
    const categoryToKeyword: Record<string, string[]> = {};
    Object.entries(wordList).forEach(([category, keywords]) => {
        selectedKeywords.forEach(selectedKeyword => {
            if (keywords.includes(selectedKeyword)) {
                if (!categoryToKeyword[category]) {
                    categoryToKeyword[category] = [];
                }
                categoryToKeyword[category].push(selectedKeyword);
            }
        });
    });

    // For each category that has selected keywords, add some more from the same category
    Object.keys(categoryToKeyword).forEach(category => {
        const sameCategoryRecommendations = getSameCategoryKeywords(category, 2)
            .filter(keyword => !selectedKeywords.includes(keyword));
        recommendations.push(...sameCategoryRecommendations);
    });

    // If no recommendations or very few, add some standard quality keywords
    if (recommendations.length < 3) {
        recommendations.push("masterpiece", "best quality", "detailed", "high quality");
    }

    // Remove duplicates, limit to maxRecommendations
    return [...new Set(recommendations)].slice(0, maxRecommendations);
};