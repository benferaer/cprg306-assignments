import { db } from "../_utils/firebase"; // Import the Firestore database instance
import { collection, getDocs, addDoc, query } from "firebase/firestore";

// Async function to retrieve all items for a specific user
export async function getItems(userId) {
    if (!userId) {
        throw new Error("User ID is required to fetch items.");
    }

    const items = [];
    try {
        // Reference to the items subcollection under the user's document
        const itemsCollectionRef = collection(db, "users", userId, "items");

        // Query the items subcollection
        const querySnapshot = await getDocs(itemsCollectionRef);

        // Loop through each document in the query snapshot
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id, // Document ID
                ...doc.data(), // Document data
            });
        });

        return items; // Return the array of items
    } catch (error) {
        console.error("Error fetching items:", error);
        throw new Error("Failed to fetch items.");
    }
}

// Async function to add a new item to a specific user's list
export async function addItem(userId, item) {
    if (!userId) {
        throw new Error("User ID is required to add an item.");
    }
    if (!item || typeof item !== "object") {
        throw new Error("A valid item object is required.");
    }

    try {
        // Reference to the items subcollection under the user's document
        const itemsCollectionRef = collection(db, "users", userId, "items");

        // Add the item to the subcollection
        const docRef = await addDoc(itemsCollectionRef, item);

        return docRef.id; // Return the ID of the newly created document
    } catch (error) {
        console.error("Error adding item:", error);
        throw new Error("Failed to add item.");
    }
}