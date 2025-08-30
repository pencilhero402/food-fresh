// import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './Recipes.css'

function Recipes () {
    // const [input, setInput] = useState('');
    return (
        <div className="min-h-[100dvh] bg-white flex flex-col">
            <main className="flex-1 p-4 relative">
                <div className="mx-auto max-w-6xl">
                    <span className="w-full max-w-md space-y-8 flex flex-col justify-start items-start">
                        <Link to="/">
                            <button className="text-black flex items-center bg-white font-mono text-sm text-gray-700 hover:text-gray-900 p-0"
                            >← Back
                            </button>
                        </Link>
                        <h1 className="text-black text-sm font-bold">Ingredients:</h1>
                    </span>
                </div>
                <div className="rounded-lg-50 border-t border-gray-50 p-3 sm:p-4 shadow-sm text-black">
                    <h2>Hello</h2>  
                </div>
            </main>
        </div>
    )
};

export default Recipes;