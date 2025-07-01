import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			setError("");
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<div className="flex h-screen bg-green-700">
			<div className="w-full max-w-xs m-auto bg-green-100 rounded p-5">
				<header>
					<img
						className="w-20 h-20 mx-auto mb-5 rounded-full"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7ZGmiiDrubcjk5-YUFINQ6eMkpjJqrY_EQ&s"
						alt="Login icon"
					/>
				</header>
				<form onSubmit={handleLogin}>
					<div>
						<label
							className="block mb-2 text-green-500"
							htmlFor="username">
							Username
						</label>
						<input
							className="w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300"
							type="text"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label
							className="block mb-2 text-green-500"
							htmlFor="password">
							Password
						</label>
						<input
							className="w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300"
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && <p className="text-sm text-red-500 mb-4">{error}</p>}
					<div>
						<input
							className="w-full cursor-pointer bg-green-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
							type="submit"
							value="Login"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
