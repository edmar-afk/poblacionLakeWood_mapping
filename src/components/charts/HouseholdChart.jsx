import { useState, useEffect } from "react";import api from "../../assets/api";function HouseholdChart() {	const [data, setData] = useState([]);	useEffect(() => {		const fetchHousehold = async () => {			try {				const response = await api.get(`/api/households/`);				setData(response.data);			} catch (error) {
				console.error("Error fetching Households:", error);
				setData([]);
			}
		};

		fetchHousehold();
	}, []);

	return (
		<div className="p-8 overflow-auto pt-16 h-screen">
			{data.map((household, index) => (
				<div key={index}>
					<h3 className="text-xl font-bold mb-4 text-gray-700">{household.family_name} Family</h3>

					<div className="relative overflow-auto">
						<div className="overflow-x-auto rounded-lg">
							<table className="min-w-full bg-white border mb-12">
								<thead>
									<tr className="bg-green-700 text-center text-xs md:text-sm font-thin text-white">
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">Name</span>
										</th>
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">Age</span>
										</th>
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">Purok</span>
										</th>
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">Status</span>
										</th>
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">DOB</span>
										</th>
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">Place of Birth</span>
										</th>
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">Role</span>
										</th>
										<th className="p-0">
											<span className="block py-2 px-3 border-r border-gray-300">Source of Income</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{household.members && household.members.length > 0 ? (
										household.members.map((member, i) => (
											<tr
												key={i}
												className="border-b text-xs md:text-sm text-center text-gray-800">
												<td className="p-2 md:p-4">{member.name}</td>
												<td className="p-2 md:p-4">{member.age}</td>
												<td className="p-2 md:p-4">{member.purok}</td>
												<td className="p-2 md:p-4">{member.status}</td>
												<td className="p-2 md:p-4">{member.dob}</td>
												<td className="p-2 md:p-4">{member.placeBirth}</td>
												<td className="p-2 md:p-4">{member.role}</td>
												<td className="p-2 md:p-4">{member.source_income}</td>
											</tr>
										))
									) : (
										<tr>
											<td
												colSpan="4"
												className="text-center text-gray-500 italic py-4">
												No family members found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default HouseholdChart;
