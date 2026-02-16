import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

export default function HomePage() {
    const [loader, setLoader] = useState(false);
    const nav = useNavigate();

    /**
     * @summary Handle logout by calling the AuthService 
     *  and then redirecting to login page
     */
    const handleLogout = async () => {
        setLoader(true);
        await AuthService.getInstance().logout();
        nav('/login', { replace: true });
    }

    /**
     * Get logged in user info and display it on the home page.
     */
    const user = AuthService.getInstance().getUser();
    if (!user) {
        // If user is not found, redirect to login page
        nav('/login', { replace: true });
        return null;
    }
    return (
        <section>
            <nav className="w-full h-16 bg-blue-500 text-white flex items-center justify-between px-10 shadow-lg sticky top-0 z-50 rounded-b-lg" >
                <Link to="/" className="text-2xl font-bold">Authently</Link>
                <ul className="flex items-center space-x-6">
                    <li>Welcome {user?.username}</li>
                    <li>
                        <button className="cursor-pointer text-xl" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>

            </nav>
            {loader ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 lg:p-10" >

                    {/* Home page content */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <article key={i} className="bg-white rounded-lg shadow-lg m-2 lg:m-4 w-full h-64 border border-gray-300 flex flex-col items-center justify-center shadow-[1px_5px_37px_-14px_rgba(59,_130,_246,_0.5)] hover:shadow-[1px_5px_37px_-14px_rgba(59,_130,_246,_0.8)] transition-shadow duration-300 cursor-pointer" >
                            <h2 className="text-xl font-bold">App {i + 1}</h2>
                            <p className="mt-4">You have access to App {i + 1}</p>
                        </article>
                    ))}
                </main>
            )}
        </section>
    )
}
