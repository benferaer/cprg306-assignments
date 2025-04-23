'use client';

import { useUserAuth } from "./_utils/auth-context";
import { useState, useEffect } from "react";
import { getItems, addItem } from "../week-10/_services/shopping-list-service";
import ItemList from "../week-8/item-list";
import NewItem from "../week-8/new-item";
import MealIdeas from "../week-8/meal-ideas";

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [items, setItems] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState("");

    // Async function to load items for the current user
    const loadItems = async () => {
        if (!user || !user.uid) {
            console.error("User is not logged in.");
            return;
        }

        try {
            const userItems = await getItems(user.uid); // Fetch items for the current user
            setItems(userItems); // Update the items state
        } catch (error) {
            console.error("Error loading items:", error);
        }
    };

    useEffect(() => {
        if (user) {
            loadItems(); // Load items when the user is logged in
        }
    }, [user]);

    const handleAddItem = async (newItem) => {
        if (!user || !user.uid) {
            console.error("User is not logged in.");
            return;
        }

        try {
            const newItemId = await addItem(user.uid, newItem); // Add the new item to Firestore
            setItems((prevItems) => [...prevItems, { id: newItemId, ...newItem }]); // Update the items state
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleItemSelect = (item) => {
        if (!item || !item.name) {
            console.error("Invalid item selected:", item);
            return;
        }

        const trimName = item.name
            .split(",")[0] // Remove size or additional details after a comma
            .replace(/[\u{1F600}-\u{1F6FF}]/gu, "") // Remove emojis
            .trim(); // Remove leading and trailing whitespace

        setSelectedItemName(trimName); // Update the selected item name
    };

    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen p-5 bg-slate-800">
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
                // If the user is logged in, display the shopping list
                <div className="flex flex-wrap gap-10 p-5 w-full">
                    {/* Logout Button in the Top-Right Corner */}
                    <div className="absolute top-5 right-5">
                        <button
                            onClick={firebaseSignOut}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="flex-1">
                        <h1 className="font-bold text-5xl mb-5 text-blue-300">Shopping List</h1>
                        <NewItem onAddItem={handleAddItem} />
                        <ItemList items={items} onItemSelect={handleItemSelect} />
                    </div>
                    <div className="flex-1">
                        {selectedItemName && (
                            <MealIdeas ingredient={selectedItemName} />
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}