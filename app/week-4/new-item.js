'use client'

import { useState } from "react";

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

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

    return (
        <div className="flex-1 justify-items-center ">
            <div className="p-2 m-4 bg-emerald-950 w-80 justify-items-center">
            <div>
                Quantity: {quantity}
            </div>
            <div className="flex-row">
            <button onClick={Decrement} disabled={quantity === 1}
                className={`px-4 py-2 text-white rounded-3xl ${quantity === 1 ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500"}`}>
                    Decrement
            </button>
            <button onClick={Increment} disabled={quantity === 20}
                className={`px-4 py-2 text-white rounded-3xl ml-5 ${quantity === 20 ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500"}`}>
                    Increment
            </button>
            </div>
            <p className="mt-5 underline"><a href="/">Back to root page</a></p>
        </div>
        </div>
    )


}