import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, signOut } from '../client/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import getRecipesIncludingIngredients from "../client/api/getRecipesIncludingIngredients";
import type { User}  from 'firebase/auth';
import './Homepage.css'

function Homepage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []); 


  const [input, setInput] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const ingredients = input.split(',').map(item => item.trim()).filter(item => item.length > 0);

  const handleOnClick = async () => {
    try {
      const result = await getRecipesIncludingIngredients(ingredients);
      setRecipes(result)
      console.log(result)
    } catch (error) {
      console.error("Failed to fetch recipes:", error)
    } 
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const removeIngredient = (ingredientToRemove: string) => {
    const remaining = ingredients.filter(item => item !== ingredientToRemove);
    setInput(remaining.join(', '));
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  };

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-white p-4 overflow-hidden relative text-black">
      <div className="absolute top-4 right-4 z-10 text-black">
        {/* Only show Login button if NOT logged in*/}
        {!user ? ( 
          <Link to="/login">
          <button className="bg-black-500 hover:bg-gray-800 text-white font-bold rounded border-none outline-none hover:outline-none hover:border-none">
            Login</button>
        </Link>
        ): (
          <button className="bg-black-500 hover:bg-gray-800 text-white font-bold rounded border-none outline-none hover:outline-none hover:border-none" onClick={handleLogout}>
            Logout</button>
        )}
      </div>
      <div className="w-full max-w-md space-y-8 text-black">
        <div className="text-center space-y-2 animate-fadeIn">
          <h1 className="font-mono text-3xl sm:text-4xl font-bold text-black tracking-tight">
            Recipes
          </h1>
          <p className="text-sm font-medium sm:text-base text-black">What ingredient(s) do you have?</p>
        </div>
        <div className="rounded-lg border bg-gray-50 p-3 sm:p-4 shadow-sm">
          <div className="font-mono text-gray-800">
            <form className="space-y-6">
              <div className="space-y-4">
                <p className="text-xs text-black font-mono pl-4 border-l-2 border-red-600">Enter ingredient(s)</p>
                <p className="text-[10px]">Separate ingredients with comma ','</p>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white border-gray-200 p-4 relative group">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 pr-1">
                      <span className="text-gray-500 font-mono text-sm-font-bold">﹥</span>
                    </div>
                    <div className="flex-1 relative">
                      <textarea className="w-full bg-transparent border-none outline-none font-mono text-gray-700 placeholder:opacity-60 resize-none min-h-[24px] leading-6" 
                      placeholder="Chicken, Brocolli" 
                      rows={1} 
                      autoFocus 
                      style={{height: '24px'}}
                      value={input}
                      onChange={handleChange}
                      />
                    </div>
                    <div className="flex-shrink-0 flex items-start pt-1 animate-fadein">
                      <button 
                      type="button"
                      className="flex items-center justify-content justify-center w-8 h-8 text-white"
                      onClick={handleOnClick}>
                        <p className="text-2xl">↩︎</p>
                      </button>
                    </div>
                  </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ingredients.map((ingredient, idx) => (
                        <span key={idx} className="inline-flex items-center bg-gray-50 opacity-80 text-gray-700 duration-200 cursor-default max-w-[200px] w-fit overflow-hidden text-xs p-px">
                          <span className = "truncate">{ingredient}</span>
                            <button type="button" className="ml-2 hover:text-red-500 transition-colors bg-gray-50 text-xs flex-shrink-0 text-xs text-black"
                            onClick ={(e) => {
                              e.preventDefault();
                              removeIngredient(ingredient)}}> x
                            </button>
                        </span>
                      ))}
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Homepage;
