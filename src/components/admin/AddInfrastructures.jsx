import React, { useState } from "react";import { Modal } from "@mui/material";import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddInfrastructures() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		description: "",
		location: "",
	});
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({
			name: "",
			type: "",
			description: "",
			location: "",
		});
		setImage(null);
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async () => {
		const infraData = new FormData();
		infraData.append("name", formData.name);
		infraData.append("type", formData.type);
		infraData.append("description", formData.description);
		infraData.append("location", formData.location);
		if (image) {
			infraData.append("image", image);
		}

		try {
			const response = await api.post("/api/infras/create/", infraData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Infrastructure added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add infrastructure failed:", error);
			setError("Failed to add infrastructure");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-green-600 text-white px-4 py-2 rounded">
				Add Infrastructure
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<div className="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32 z-[999999] overflow-y-auto w-full">
					<div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
						<div className="p-6">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">Add Infrastructure</h2>
							<p className="text-gray-700 mb-6">Fill in the information below</p>
							<form>
								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="name">
										Name
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="name"
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="Name"
									/>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="type">
										Type
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="type"
										type="text"
										name="type"
										value={formData.type}
										onChange={handleChange}
										placeholder="Type"
									/>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="description">
										Description
									</label>
									<textarea
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="description"
										name="description"
										value={formData.description}
										onChange={handleChange}
										placeholder="Description"
										rows="3"></textarea>
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

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="image">
										Image
									</label>
									<input
										className="block w-full text-sm text-gray-700"
										id="image"
										type="file"
										accept="image/png, image/jpeg, image/jpg"
										onChange={handleImageChange}
									/>
								</div>

								{error && <p className="text-sm text-red-500 mb-4">{error}</p>}

								<div className="flex items-center justify-between">
									<button
										type="button"
										onClick={handleSubmit}
										className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
										Submit
									</button>
									<button
										type="button"
										onClick={handleClose}
										className="text-sm font-bold text-purple-500 hover:text-purple-800">
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

export default AddInfrastructures;
