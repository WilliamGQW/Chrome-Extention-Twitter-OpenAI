type PromptFN = (basis: string, type: string) => string;

// Prompt for a new standalone tweet
export const whatsHappeningPrompt: PromptFN = (topic, type) => `Write a ${type} tweet about ${topic} in 50 words. Don't use hashtags.`;

// Promt for a reply
export const replyPrompt: PromptFN = (tweet, type) => `Write a ${type} reply to a tweet "${tweet}" in 50 words. Don't use hashtags.`;