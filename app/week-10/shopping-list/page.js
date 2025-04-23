'use client';

import ItemList from "./item-list";
import { useState, useEffect } from "react";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context"; // Assuming this provides user authentication context

export default function Page() {
    const { user } = useUserAuth(); // Get the current user
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
    }, [user]); // Re-run when the user changes

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
        <main className="flex flex-wrap gap-10 p-5">
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
        </main>
    );
}