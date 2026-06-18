import { app } from "../server";

// Vercel expects a default export that's a request handler function.
// Forward incoming requests to the Express app instance.
export default async function handler(req: any, res: any) {
	return app(req, res);
}

// Also export the app for local use or other imports.
export { app };
