import { wordList } from '../data/wordList';

// Function to analyze text description and extract relevant keywords
export const analyzeDescription = async (description: string): Promise<{
    keywords: string[];
    categories: string[];
}> => {
    const lowerDesc = description.toLowerCase();
    const allKeywords = Object.entries(wordList).flatMap(
        ([category, keywords]) => keywords.map(keyword => ({
            category,
            keyword,
            // Remove any weight notation like (keyword:1.2)
            cleanKeyword: keyword.replace(/\([^)]*\)/g, '').trim().toLowerCase()
        }))
    );

    // Find matching keywords
    const matchedKeywords: string[] = [];
    const matchedCategories = new Set<string>();

    // Check for direct keyword matches
    allKeywords.forEach(({ category, keyword, cleanKeyword }) => {
        // Check if the keyword is in the description
        if (lowerDesc.includes(cleanKeyword)) {
            matchedKeywords.push(keyword);
            matchedCategories.add(category);
        }
    });

    // Add basic character attributes based on description
    if (lowerDesc.includes('character') || lowerDesc.includes('person')) {
        if (lowerDesc.includes('male') || lowerDesc.includes('boy') || lowerDesc.includes('man')) {
            matchedKeywords.push('1boy');
            matchedCategories.add('Character Attributes');
        }
        if (lowerDesc.includes('female') || lowerDesc.includes('girl') || lowerDesc.includes('woman')) {
            matchedKeywords.push('1girl');
            matchedCategories.add('Character Attributes');
        }
    }

    // Add hair color if mentioned
    const hairColors = ['white hair', 'black hair', 'blue hair', 'red hair', 'pink hair', 'blonde hair', 'green hair', 'purple hair'];
    hairColors.forEach(hairColor => {
        if (lowerDesc.includes(hairColor)) {
            matchedKeywords.push(hairColor);
            matchedCategories.add('Physical Features');
        }
    });

    // Add pose type if mentioned
    if (lowerDesc.includes('half-body') || lowerDesc.includes('half body')) {
        matchedKeywords.push('half body');
        matchedCategories.add('Poses/Actions (SFW and NSFW)');
    } else if (lowerDesc.includes('full-body') || lowerDesc.includes('full body')) {
        matchedKeywords.push('full body');
        matchedCategories.add('Poses/Actions (SFW and NSFW)');
    } else if (lowerDesc.includes('portrait') || lowerDesc.includes('headshot')) {
        matchedKeywords.push('portrait');
        matchedCategories.add('Poses/Actions (SFW and NSFW)');
    }

    // Add illustration style keywords
    if (lowerDesc.includes('illustration') || lowerDesc.includes('drawing')) {
        matchedKeywords.push('illustration');
        matchedCategories.add('Visual Theme');

        // Check for specific styles
        if (lowerDesc.includes('anime') || lowerDesc.includes('manga')) {
            matchedKeywords.push('anime');
            matchedCategories.add('Artists/Style References');
        } else if (lowerDesc.includes('realistic') || lowerDesc.includes('photorealistic')) {
            matchedKeywords.push('photorealistic');
            matchedCategories.add('Visual Theme');
        }
    }

    // Always add some quality keywords
    matchedKeywords.push('masterpiece', 'best quality');
    matchedCategories.add('Image Quality/Technical');

    // Cara manual untuk membuat array unik tanpa Set
    const uniqueKeywords: string[] = [];
    for (let i = 0; i < matchedKeywords.length; i++) {
        if (uniqueKeywords.indexOf(matchedKeywords[i]) === -1) {
            uniqueKeywords.push(matchedKeywords[i]);
        }
    }

    // Konversi Set ke Array secara manual
    const categoryArray: string[] = [];
    matchedCategories.forEach((category) => {
        categoryArray.push(category);
    });

    return {
        keywords: uniqueKeywords,
        categories: categoryArray
    };
};