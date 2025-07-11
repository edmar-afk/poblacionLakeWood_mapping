import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../assets/api";
import AddSeniors from "../components/admin/AddSeniors";
function Seniors() {
	const [seniors, setSeniors] = useState([]);
	const [filterText, setFilterText] = useState("");

	const fetchSeniors = async () => {
		try {
			const res = await api.get("/api/seniors/");
			setSeniors(res.data);
		} catch (err) {
			console.error("Failed to fetch Seniors:", err);
		}
	};

	const deleteSenior = async (id) => {
		try {
			await api.delete(`/api/seniors/${id}/`);
			setSeniors((prev) => prev.filter((s) => s.id !== id));
		} catch (err) {
			console.error("Failed to delete Senior:", err);
		}
	};

	useEffect(() => {
		fetchSeniors();
	}, []);

	const columns = [
		{
			name: "Name",
			selector: (row) => row.people,
			sortable: true,
		},
		{
			name: "Age",
			selector: (row) => row.age,
			sortable: true,
		},
		{
			name: "Gender",
			selector: (row) => row.gender,
			sortable: true,
		},
		{
			name: "Purok",
			selector: (row) => row.purok,
			sortable: true,
		},
		{
			name: "Status",
			selector: (row) => row.status,
			sortable: true,
		},
		{
			name: "DOB",
			selector: (row) => row.dob,
			sortable: true,
		},
		{
			name: "Address",
			selector: (row) => row.address,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<button
					type="button"
					onClick={() => deleteSenior(row.id)}
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
					Delete
				</button>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const filteredItems = seniors.filter(
		(senior) =>
			(senior.people || "").toLowerCase().includes(filterText.toLowerCase()) ||
			(senior.gender || "").toLowerCase().includes(filterText.toLowerCase()) ||
			(senior.age + "").includes(filterText)
	);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
				<AddSeniors />
				<div className="flex flex-col md:flex-row gap-2">
					<input
						type="text"
						placeholder="Search name, age, gender"
						className="border border-gray-300 rounded px-3 py-1"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
					/>
					<p
						onClick={fetchSeniors}
						className="cursor-pointer text-purple-600 hover:underline self-center">
						Refresh
					</p>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={filteredItems}
				pagination
				highlightOnHover
				pointerOnHover
				noDataComponent="No Senior records found."
				className="bg-white rounded"
			/>
		</section>
	);
}

export default Seniors;
