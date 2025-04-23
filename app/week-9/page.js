'use client';

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
            {!user ? (
                // If the user is not logged in, display the login button
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-5">Welcome to the Shopping List App</h1>
                    <button
                        onClick={gitHubSignIn}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                    >
                        Login with GitHub
                    </button>
                </div>
            ) : (
                // If the user is logged in, display the welcome message, logout button, and link to the shopping list
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-5 text-black">Welcome, {user.displayName}!</h1>
                    <p className="text-lg mb-5 text-black">Email: {user.email}</p>
                    <button
                        onClick={firebaseSignOut}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 mb-5"
                    >
                        Logout
                    </button>
                    <a
                        href="/week-9"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                    >
                        Go to Shopping List
                    </a>
                </div>
            )}
        </main>
    );
}