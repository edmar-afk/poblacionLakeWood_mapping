import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddSeniors() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		people: "",
		age: "",
		gender: "",
		location: "",
		purok: "",
		status: "",
		dob: "",
		address: "",
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({
			people: "",
			age: "",
			gender: "",
			location: "",
			purok: "",
			status: "",
			dob: "",
			address: "",
		});
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
			const response = await api.post("/api/seniors/", formData);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
			setError("Failed to add data");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-green-600 text-white px-4 py-2 rounded">
				Add Seniors
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
							<h2 className="text-2xl font-bold text-gray-800 mb-2">Add Seniors</h2>
							<p className="text-gray-700 mb-6">Fill in the information below</p>
							<form>
								{[
									{ id: "people", label: "Full Name", type: "text" },
									{ id: "age", label: "Age", type: "number" },
									{ id: "location", label: "Location", type: "text" },
									{ id: "dob", label: "Date of Birth", type: "text" },
									{ id: "address", label: "Address", type: "text" },
								].map(({ id, label, type }) => (
									<div
										className="mb-4"
										key={id}>
										<label
											className="block text-gray-700 font-bold mb-2"
											htmlFor={id}>
											{label}
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id={id}
											type={type}
											name={id}
											value={formData[id]}
											onChange={handleChange}
											placeholder={label}
										/>
									</div>
								))}

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="gender">
										Gender
									</label>
									<select
										name="gender"
										value={formData.gender}
										onChange={handleChange}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
										<option
											value=""
											disabled>
											Select Gender
										</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
									</select>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="purok">
										Purok
									</label>
									<select
										name="purok"
										value={formData.purok}
										onChange={handleChange}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
										<option
											value=""
											disabled>
											Select Purok
										</option>
										{[1, 2, 3, 4, 5, 6, 7].map((num) => (
											<option
												key={num}
												value={`Purok ${num}`}>
												Purok {num}
											</option>
										))}
									</select>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="status">
										Status
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="status"
										type="text"
										name="status"
										value={formData.status}
										onChange={handleChange}
										placeholder="Status"
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

export default AddSeniors;
