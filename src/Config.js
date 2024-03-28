// config.js

export const generateBaseURL = (subdomain) => {
    const baseURL = `${subdomain}.localhost:3000`
    //  = import.meta.env.NODE_ENV === 'development'
    //   ? 
    //   : `http://www.${subdomain}.yourhosteddomain.com`;
    return baseURL;
  };
  