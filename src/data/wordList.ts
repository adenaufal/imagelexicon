import characterAttributes from './keywords/character-attributes.json';
import artists from './keywords/artists.json';
import visualTheme from './keywords/visual-theme.json';
import settingEnvironment from './keywords/setting-environment.json';
import clothingAppearance from './keywords/clothing-appearance.json';
import physicalFeatures from './keywords/physical-features.json';
import expressions from './keywords/expressions.json';
import visualEffects from './keywords/visual-effects.json';
import poses from './keywords/poses.json';
import sexualContent from './keywords/sexual-content.json';
import imageQuality from './keywords/image-quality.json';

export const wordList: Record<string, string[]> = {
    "Character Attributes": characterAttributes,
    "Artists/Style References": artists,
    "Visual Theme": visualTheme,
    "Setting/Environment": settingEnvironment,
    "Clothing/Appearance": clothingAppearance,
    "Physical Features": physicalFeatures,
    "Expressions/Emotions": expressions,
    "Visual Effects": visualEffects,
    "Poses/Actions (SFW and NSFW)": poses,
    "Sexual Content/Actions": sexualContent,
    "Image Quality/Technical": imageQuality
};