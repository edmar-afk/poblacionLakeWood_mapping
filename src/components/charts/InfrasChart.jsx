import { useState, useEffect } from "react";import api from "../../assets/api";
function InfrasChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchInfras = async () => {
			try {
				const response = await api.get(`/api/infras/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching infrastructures:", error);
				setData([]);
			}
		};

		fetchInfras();
	}, []);

	const defaultImage = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a";

	return (
		<>
			<p className="text-gray-800 text-center pt-12 text-4xl font-extrabold">INFRASTRUCTURE</p>

			<div className="flex flex-col justify-center">
				{data.map((infra, index) => (
					<div
						className="antialiased text-gray-900"
						key={index}>
						<div className="bg-gray-200 h-fit p-8 flex items-center justify-center">
							<div className="bg-white rounded-lg overflow-hidden shadow-2xl w-full">
								<img
									className="h-48 w-full object-cover object-end"
									src={infra.image ? infra.image : defaultImage}
								/>
								<div className="p-6">
									<div className="flex items-baseline">
										<span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
											{infra.type}
										</span>
									</div>
									<h4 className="mt-2 font-semibold text-lg leading-tight truncate">{infra.name}</h4>

									<p className="mt-1 text-gray-600 text-sm">{infra.description}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default InfrasChart;
