import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddMembers() {
	const [open, setOpen] = useState(false);
	const [households, setHouseholds] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		role: "",
		household: "",
		purok: "",
		status: "",
		dob: "",
		placeBirth: "",
	});
	const [error, setError] = useState("");

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const handleOpen = () => {
		fetchHouseholds();
		setOpen(true);
	};

	const handleClose = () => {
		setFormData({
			name: "",
			age: "",
			role: "",
			household: "",
			purok: "",
			status: "",
			dob: "",
			placeBirth: "",
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
			await api.post("/api/householdmembers/", formData);
			handleClose();
		} catch (err) {
			console.error("Add member failed:", err);
			setError("Failed to add member");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-green-600 text-white px-4 py-2 rounded">
				Add Member
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
							<h2 className="text-2xl font-bold text-gray-800 mb-2">Add Household Member</h2>
							<p className="text-gray-700 mb-6">Fill in the information below</p>
							<form>
								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="name">
										Name
									</label>
									<input
										id="name"
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="Name"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
									/>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="age">
										Age
									</label>
									<input
										id="age"
										type="number"
										name="age"
										value={formData.age}
										onChange={handleChange}
										placeholder="Age"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
									/>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="role">
										Role
									</label>
									<select
										name="role"
										value={formData.role}
										onChange={handleChange}
										className="shadow border rounded w-full py-2 px-3 text-gray-700">
										<option
											value=""
											disabled>
											Select Role
										</option>
										<option value="Father">Father</option>
										<option value="Mother">Mother</option>
										<option value="Son">Son</option>
										<option value="Daughter">Daughter</option>
									</select>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="household">
										Household
									</label>
									<select
										name="household"
										value={formData.household}
										onChange={handleChange}
										className="shadow border rounded w-full py-2 px-3 text-gray-700">
										<option
											value=""
											disabled>
											Select Household
										</option>
										{households.map((h) => (
											<option
												key={h.id}
												value={h.id}>
												{h.family_name}
											</option>
										))}
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
										className="shadow border rounded w-full py-2 px-3 text-gray-700">
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
									</select>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="status">
										Status
									</label>
									<select
										name="status"
										value={formData.status}
										onChange={handleChange}
										className="shadow border rounded w-full py-2 px-3 text-gray-700">
										<option
											value=""
											disabled>
											Select Status
										</option>
										<option value="Single">Single</option>
										<option value="Married">Married</option>
									</select>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="dob">
										Date of Birth
									</label>
									<input
										id="dob"
										type="date"
										name="dob"
										value={formData.dob}
										onChange={handleChange}
										className="shadow border rounded w-full py-2 px-3 text-gray-700"
									/>
								</div>

								<div className="mb-4">
									<label
										className="block text-gray-700 font-bold mb-2"
										htmlFor="placeBirth">
										Place of Birth
									</label>
									<input
										id="placeBirth"
										type="text"
										name="placeBirth"
										value={formData.placeBirth}
										onChange={handleChange}
										placeholder="e.g. Cebu City"
										className="shadow border rounded w-full py-2 px-3 text-gray-700"
									/>
								</div>

								{error && <p className="text-sm text-red-500 mb-4">{error}</p>}

								<div className="flex items-center justify-between">
									<button
										type="button"
										onClick={handleSubmit}
										className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
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

export default AddMembers;
