import React, { useState } from "react";
import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddHousehold() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		family_name: "",
		location: "",
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({ family_name: "", location: "" });
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		try {
			const payload = {
				...formData,
				members: [],
			};
			const response = await api.post("/api/households/", payload);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
			setError("Failed to add household");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-green-600 text-white px-4 py-2 rounded">
				Add Household
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.7)",
					},
				}}>
				<div className="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32 z-[999999] overflow-y-auto w-full">
					<div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
						<div className="p-6">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">Add Household</h2>
							<p className="text-gray-700 mb-6">Enter family information below</p>
							<form>
								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="family_name">
										Family Name
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="family_name"
										type="text"
										name="family_name"
										value={formData.family_name}
										onChange={handleChange}
										placeholder="Family Name"
									/>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="location">
										Location
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="location"
										type="text"
										name="location"
										value={formData.location}
										onChange={handleChange}
										placeholder="Location"
									/>
								</div>

								{error && <p className="text-sm text-red-500 mb-4">{error}</p>}

								<div className="flex items-center justify-between">
									<button
										type="button"
										onClick={handleSubmit}
										className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
										Submit
									</button>
									<button
										type="button"
										onClick={handleClose}
										className="text-sm font-bold text-cyan-500 hover:text-cyan-800">
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default AddHousehold;
