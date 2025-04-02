'use client';

import { useState, useEffect } from 'react';

async function fetchMealIdeas(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (!response.ok) {
        throw new Error('Failed to fetch meal ideas');
    }
    const data = await response.json();
    return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]); // Initialize to an empty array
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const loadMealIdeas = async () => {
        setLoading(true); // Set loading to true
        setError(null); // Reset error state
        try {
            const mealIdeas = await fetchMealIdeas(ingredient);
            setMeals(mealIdeas);
        } catch (error) {
            console.error('Error fetching meal ideas:', error);
            setError('Failed to fetch meal ideas. Please try again later.');
            setMeals([]);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    useEffect(() => {
        if (ingredient) {
            loadMealIdeas();
        }
    }, [ingredient]);

    return (
        <div>
            <h2 className="font-bold text-xl mb-4">Meal Ideas for "{ingredient}"</h2>
            {loading && <p>Loading meal ideas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && meals.length === 0 && (
                <p>No meal ideas found for "{ingredient}".</p>
            )}
            <ul className="list-disc ml-5">
                {meals.map((meal) => (
                    <li key={meal.idMeal}>
                        <div className="flex items-center gap-4">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-16 h-16 rounded"
                            />
                            <span>{meal.strMeal}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}