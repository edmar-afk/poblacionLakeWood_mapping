import { useEffect, useState } from "react";import DataTable from "react-data-table-component";import api from "../assets/api";import AddMembers from "../components/admin/AddMembers";function HouseholdMembers() {
	const [households, setHouseholds] = useState([]);
	const [filterText, setFilterText] = useState("");

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const deleteMember = async (householdId, memberId) => {
		try {
			await api.delete(`/api/households/${householdId}/members/${memberId}/`);
			setHouseholds((prev) =>
				prev.map((household) =>
					household.id === householdId
						? {
								...household,
								members: household.members.filter((m) => m.id !== memberId),
						  }
						: household
				)
			);
		} catch (err) {
			console.error("Failed to delete member:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	const members = households.flatMap((household) =>
		household.members.map((member, idx) => ({
			id: member.id,
			householdId: household.id,
			family_name: household.family_name,
			member_name: member.name,
			age: member.age,
			role: member.role,
			purok: member.purok,
			status: member.status,
			dob: member.dob,
			placeBirth: member.placeBirth,
			source_income: member.source_income,
			show_family_name: idx === 0,
		}))
	);

	const filteredItems = members.filter(
		(m) =>
			m.family_name.toLowerCase().includes(filterText.toLowerCase()) ||
			m.member_name.toLowerCase().includes(filterText.toLowerCase()) ||
			m.role.toLowerCase().includes(filterText.toLowerCase()) ||
			(m.age + "").includes(filterText) ||
			m.purok.toLowerCase().includes(filterText.toLowerCase()) ||
			m.status.toLowerCase().includes(filterText.toLowerCase()) ||
			m.dob.toLowerCase().includes(filterText.toLowerCase()) ||
			m.placeBirth.toLowerCase().includes(filterText.toLowerCase()) ||
			m.source_income.toLowerCase().includes(filterText.toLowerCase())
	);

	const columns = [
		{
			name: "Family Name",
			selector: (row) => row.family_name,
			sortable: true,
			cell: (row, index) => {
				const prev = filteredItems[index - 1];
				if (!prev || prev.family_name !== row.family_name) {
					return row.family_name;
				}
				return "";
			},
			grow: 1.5,
		},
		{
			name: "Member Name",
			selector: (row) => row.member_name,
			sortable: true,
		},
		{
			name: "Age",
			selector: (row) => row.age,
			sortable: true,
			width: "80px",
		},
		{
			name: "Role",
			selector: (row) => row.role,
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
			name: "Date of Birth",
			selector: (row) => row.dob,
			sortable: true,
		},
		{
			name: "Place of Birth",
			selector: (row) => row.placeBirth,
			sortable: true,
		},
		{
			name: "Source of Income",
			selector: (row) => row.source_income,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<button
					type="button"
					onClick={() => deleteMember(row.householdId, row.id)}
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
					Delete
				</button>
			),
			ignoreRowClick: true,
			button: true,
		},
	];

	return (
		<section className="w-full">
			<div className="my-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
				<AddMembers />
				<div className="flex flex-col md:flex-row gap-2">
					<input
						type="text"
						placeholder="Search family, name, role, age, etc."
						className="border border-gray-300 rounded px-3 py-1"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
					/>
					<p
						onClick={fetchHouseholds}
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
				noDataComponent="No household members found."
				className="bg-white rounded"
			/>
		</section>
	);
}

export default HouseholdMembers;
