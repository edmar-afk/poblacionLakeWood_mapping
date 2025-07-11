import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddPwd() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		people: "",
		age: "",
		gender: "",
		location: "",
		purok: "",
		status: "",
		disability_type: "",
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
			disability_type: "",
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
			const payload = {
				...formData,
				description: "sample",
			};
			const response = await api.post("/api/pwds/", payload);
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
				Add PWD
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
				}}>
				<div className="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32 z-[999999] overflow-y-auto w-full">
					<div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
						<div className="p-6">
							<h2 className="text-2xl font-bold text-gray-800 mb-2">Add PWD</h2>
							<p className="text-gray-700 mb-6">Fill in the information below</p>
							<form>
								{[
									{ name: "people", label: "Full Name", type: "text" },
									{ name: "age", label: "Age", type: "number" },
									{ name: "location", label: "Location", type: "text" },
									{ name: "status", label: "Status", type: "text" },
									{ name: "disability_type", label: "Disability Type", type: "text" },
								].map(({ name, label, type }) => (
									<div
										className="mb-4"
										key={name}>
										<label
											className="block text-gray-700 font-bold mb-2"
											htmlFor={name}>
											{label}
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id={name}
											type={type}
											name={name}
											value={formData[name]}
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
										<option value="Purok 1">Purok 1</option>
										<option value="Purok 2">Purok 2</option>
										<option value="Purok 3">Purok 3</option>
										<option value="Purok 4">Purok 4</option>
										<option value="Purok 5">Purok 5</option>
										<option value="Purok 6">Purok 6</option>
										<option value="Purok 7">Purok 7</option>
									</select>
								</div>

								{error && <p className="text-sm text-red-500 mb-4">{error}</p>}

								<div className="flex items-center justify-between">
									<button
										type="button"
										onClick={handleSubmit}
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
										Submit
									</button>
									<button
										type="button"
										onClick={handleClose}
										className="text-sm font-bold text-blue-500 hover:text-blue-800">
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

export default AddPwd;
