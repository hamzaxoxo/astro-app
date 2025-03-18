import type { APIRoute } from "astro";
const  API_URL = "https://express-boiler-plate.vercel.app";
// const  API_URL = "http://localhost:5000";
export const GET: APIRoute = async () => {
    try {
        const response = await fetch(`${API_URL}/api/users`);
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const response = await fetch(`${API_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error("Failed to save user");
        }

        return new Response(JSON.stringify({ message: "Profile saved successfully! 🎉" }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};