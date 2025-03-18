import type { APIRoute } from "astro";
const API_URL = "https://express-boiler-plate.vercel.app";
// const API_URL = "http://localhost:5000";
export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const userId = params.id;
        const body = await request.json();

        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        const updatedUser = await response.json();

        return new Response(JSON.stringify({ message: "User updated successfully!", user: updatedUser }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const userId = params.id;
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        return new Response(JSON.stringify({ message: "User deleted successfully!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
