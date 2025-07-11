import React, { useEffect, useState } from "react";import DataTable from "react-data-table-component";import api from "../assets/api";import AddPwd from "../components/admin/AddPwd";
function Pwd() {
	const [pwds, setPwds] = useState([]);
	const [filterText, setFilterText] = useState("");

	const fetchPwds = async () => {
		try {
			const res = await api.get("/api/pwds/");
			setPwds(res.data);
		} catch (err) {
			console.error("Failed to fetch PWDs:", err);
		}
	};

	const deletePwd = async (id) => {
		try {
			await api.delete(`/pwds/${id}/`);
			setPwds((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error("Failed to delete PWD:", err);
		}
	};

	useEffect(() => {
		fetchPwds();
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
			name: "Disability Type",
			selector: (row) => row.disability_type,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<button
					onClick={() => deletePwd(row.id)}
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
					Delete
				</button>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const filteredItems = pwds.filter(
		(pwd) =>
			(pwd.people || "").toLowerCase().includes(filterText.toLowerCase()) ||
			(pwd.gender || "").toLowerCase().includes(filterText.toLowerCase()) ||
			(pwd.age + "").includes(filterText)
	);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
				<AddPwd />
				<div className="flex flex-col md:flex-row gap-2">
					<input
						type="text"
						placeholder="Search name, age, gender"
						className="border border-gray-300 rounded px-3 py-1"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
					/>
					<p
						onClick={fetchPwds}
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
				noDataComponent="No PWD records found."
				className="bg-white rounded"
			/>
		</section>
	);
}

export default Pwd;
