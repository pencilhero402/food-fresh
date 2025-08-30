import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../client/firebase";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Registered: ", userCredential.user.email);
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-white p-4 overflow-hidden relative text-black">
            <div className="w-full max-w-md space-y-8">
                <Link to="/">
                <button className="flex items-center bg-white font-mono text-sm text-gray-700 hover:text-gray-900 absolute left-4 top-4">← Back to Homepage</button>
                </Link>
            </div>
            <div className="text-center space-y-2">
                <h1 className="font-mono text-3xl font-bold text-black">Recipes</h1>
                <p>Create an Account</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3 sm:p-4 shadow-sm w-full max-w-md">
                <div className="font-mono text-gray-800">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <span> Login</span>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-600 flex items-center space-x-2">
                                    <span> Email Address </span>
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center space-x-2">
                                        <input className="flex-1 bg-transparent outline-none font-mono text-sm text-gray-700 placeholder:text-gray-400" placeholder="joebiden@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <label className="text-xs font-mono text-gray-600 flex items-center space-x-2">
                                    <span> Password</span>
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center space-x-2">
                                        <input className="flex-1 bg-transparent outline-none font-mono text-sm text-gray-700 placeholder:text-gray-400" placeholder="······" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-600 font-mono text-xs">{error}</p>
                        )}
                        <div className="text-white flex flex-col justify-center w-full">
                            <button
                                type="submit"
                            >Sign up</button>
                            <div className="text-black flex w-full justify-center items-center text-xs">
                                <p>Already have an account?</p>
                                <Link to="/login">
                                    <button className="bg-gray-50 outline-none focus:outline-none hover:ring-1 transition focus:ring-0 text-black">Login</button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Register;

