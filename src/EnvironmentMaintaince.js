import allUrls from "./Baseurls";

  
  
  export const env = import.meta.env.VITE_ENV
  export const baseurl = allUrls[env];
