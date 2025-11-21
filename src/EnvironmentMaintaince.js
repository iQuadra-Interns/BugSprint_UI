import allUrls from "./Baseurls";

const rawEnv = import.meta.env.VITE_ENV || "DEV";
const resolvedEnv = (typeof rawEnv === 'string') ? rawEnv : 'DEV';

// Find matching key in allUrls case-insensitively, default to 'DEV'
const matchedKey = Object.keys(allUrls).find(k => k.toLowerCase() === resolvedEnv.toLowerCase()) || 'DEV';

export const env = matchedKey;
export const baseurl = allUrls[matchedKey];
