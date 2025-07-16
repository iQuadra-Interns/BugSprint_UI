import allUrls from "./Baseurls";

  
  
  export const env = (import.meta.env.VITE_ENV || "DEV"); 
  export const baseurl = allUrls[env];
