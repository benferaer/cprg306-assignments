'use client';

import Item from "./item";
import { useState } from "react";

export default function ItemList({ items, onItemSelect }) {
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    return (
        <div>
            <div className="flex space-x-4 mb-4 ml-5">
                <button
                    onClick={() => setSortBy("name")}
                    className={`px-4 py-2 rounded ${
                        sortBy === "name" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    Sort by Name
                </button>
                <button
                    onClick={() => setSortBy("category")}
                    className={`px-4 py-2 rounded ${
                        sortBy === "category" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    Sort by Category
                </button>
            </div>

            <section className="flex flex-col gap-4">
                {sortedItems.map((item, index) => (
                    <Item
                        key={index}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                        onSelect={() => onItemSelect(item)}
                    />
                ))}
            </section>
        </div>
    );
}