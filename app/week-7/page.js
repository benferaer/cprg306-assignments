'use client';

import ItemList from "./item-list";
import ItemsData from "./items.json";
import { useState } from "react";
import NewItem from "./new-item";

export default function Page() {
    const [items, setItems] = useState(ItemsData);

    const handleAddItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }

    return (
      <main>
        <h1 className="font-bold text-5xl m-5 text-blue-300">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items}/>
      </main>
    );
  }