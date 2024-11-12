# React + TypeScript + Vite

This is a simple Fruit Catalog APP


![CleanShot 2024-11-08 at 15 06 22](https://github.com/user-attachments/assets/9f3521f6-839b-4195-8a55-0333169ae7e6)


The site is deployed here: https://fruitsappdemo.netlify.app/

This project uses a Netlify Function as a proxy server to handle CORS (Cross-Origin Resource Sharing) issues when making API requests. The proxy server acts as a middleware between the frontend application and the target API.

### Implementation
The proxy is implemented in `netlify/functions/proxy.ts` and handles CORS by:
1. Receiving requests from the frontend
2. Forwarding them to the target API
3. Returning the response back to the client


 
