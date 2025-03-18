'use client'

import { useState } from "react";

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Produce");

    const Increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };
    
    const Decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let item = {name, quantity, category};
        console.log(item);
        alert(`Item Added: \nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

        setName("");
        setQuantity(1);
        setCategory("Produce");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex-1 justify-items-center ">
            <div className="p-2 m-4 bg-emerald-950 w-80 justify-items-center">
            <input type="text" placeholder="item name" className="rounded-lg w-full mt-1 border-2 border-gray-300 p-2 font-sans text-black" value={name} required onChange={(event) => setName(event.target.value)} />
            <div className="mt-5">
                Quantity: {quantity}
            </div>
            <div className="flex-row">
            <button type="button" onClick={Decrement} disabled={quantity === 1}
                className={`px-4 py-2 text-white rounded-3xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
                    quantity === 1 ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}>
                    Decrement
            </button>
            <button type="button" onClick={Increment} disabled={quantity === 20}
                className={`px-4 py-2 text-white rounded-3xl ml-5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
                    quantity === 20 ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}>
                    Increment
            </button>
            </div>
            <div className="mt-5">
            <label>
                Category:  
                <select className="rounded-lg h-7 ml-2 text-black font-sans" required value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Meat">Meat</option>
                    <option value="Frozen Foods">Frozen Foods</option>
                    <option value="Canned Goods">Canned Goods</option>
                    <option value="Dry Goods">Dry Goods</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Household">Household</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            </div>
            <button type="submit" className="w-full text-xs p-3 mt-7 py-2 font-semibold text-white bg-emerald-700 rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 transition duration-200">Add Item</button>
            <p className="mt-5 underline"><a href="/">Back to root page</a></p>
        </div>
        </div>
        </form>
    )

}