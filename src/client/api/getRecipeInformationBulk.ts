import spoonacularConfig from "../spoonacular";

/*
GET https://api.spoonacular.com/recipes/informationBulk
Example Request and Response
GET
https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429
*/
async function getRecipeInformationBulk (ids: string[]) {
    const query = ids.join(',');
    const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${query}&apiKey=${spoonacularConfig.apiKey}`;

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

export default getRecipeInformationBulk;