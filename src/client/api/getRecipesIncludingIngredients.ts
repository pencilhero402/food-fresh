import spoonacularConfig from "../spoonacular";

// GET https://api.spoonacular.com/recipes/findByIngredients
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=YOUR_API_KEY
async function getRecipesIncludingIngredients (ingredients: string[]) {
    const query = ingredients.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=${spoonacularConfig.apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Recipes: ", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch recipes: ", error);
        return [];
    }
}   

export default getRecipesIncludingIngredients;