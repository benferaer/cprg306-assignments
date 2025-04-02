'use client';

import ItemList from "./item-list";
import ItemsData from "./items.json";
import { useState } from "react";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";

export default function Page() {
    const [items, setItems] = useState(ItemsData);
    const [selectedItemName, setSelectedItemName] = useState("");

    const handleAddItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
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