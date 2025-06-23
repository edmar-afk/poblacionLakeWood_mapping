import { useState, useEffect } from "react";import Chart from "react-apexcharts";
import api from "../../assets/api";

function PwdCharts() {
	const [, setData] = useState([]);
	const [ageCounts, setAgeCounts] = useState([0, 0, 0, 0]);
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });

	useEffect(() => {
		const fetchPwds = async () => {
			try {
				const response = await api.get(`/api/pwds/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageGroupCounts = [0, 0, 0, 0];
				const genderGroupCounts = { Male: 0, Female: 0 };

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (age >= 1 && age <= 30) ageGroupCounts[0]++;
						else if (age >= 31 && age <= 60) ageGroupCounts[1]++;
						else if (age >= 61 && age <= 90) ageGroupCounts[2]++;
						else if (age >= 91) ageGroupCounts[3]++;
					}

					if (gender === "Male" || gender === "Female") {
						genderGroupCounts[gender]++;
					}
				});

				setAgeCounts(ageGroupCounts);
				setGenderCounts(genderGroupCounts);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
				setAgeCounts([0, 0, 0, 0]);
				setGenderCounts({ Male: 0, Female: 0 });
			}
		};

		fetchPwds();
	}, []);

	const basePieOptions = {
		chart: {
			width: "100%",
			height: "100%",
			type: "pie",
		},
		theme: {
			monochrome: {
				enabled: true,
			},
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: -5,
				},
			},
		},
		grid: {
			padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			},
		},
		dataLabels: {
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex];
				return [name, val.toFixed(1) + "%"];
			},
		},
		legend: {
			show: false,
		},
	};

	const ageLabels = ["1–30", "31–60", "61–90", "91+"];
	const genderLabels = ["Male", "Female"];

	const ageOptions = {
		...basePieOptions,
		labels: ageLabels,
	};

	const genderOptions = {
		...basePieOptions,
		labels: genderLabels,
	};

	return (
		<div className="space-y-16 pt-12">
			<div className="text-center text-4xl font-extrabold text-gray-800">PWDs</div>

			<div className="flex flex-row justify-center items-center gap-8">
				<div className="w-72 h-[200px]">
					<Chart
						options={ageOptions}
						series={ageCounts}
						type="pie"
						height={200}
					/>
				</div>
				<div className="flex flex-col gap-2">
					{ageCounts.map((count, i) => (
						<div
							key={i}
							className="flex justify-between w-48 bg-gray-100 px-4 py-2 rounded shadow">
							<span>{ageLabels[i]}</span>
							<span>{count}</span>
						</div>
					))}
				</div>
			</div>
			<p className="text-center -mt-4 text-sm">By Age</p>

			<div className="flex flex-row justify-center items-center gap-8">
				<div className="w-72 h-[200px]">
					<Chart
						options={genderOptions}
						series={[genderCounts.Male, genderCounts.Female]}
						type="pie"
						height={200}
					/>
				</div>
				<div className="flex flex-col gap-2">
					{genderLabels.map((label, i) => (
						<div
							key={label}
							className="flex justify-between w-48 bg-gray-100 px-4 py-2 rounded shadow">
							<span>{label}</span>
							<span>{i === 0 ? genderCounts.Male : genderCounts.Female}</span>
						</div>
					))}
				</div>
			</div>
			<p className="text-center -mt-4 text-sm">By Gender</p>
		</div>
	);
}

export default PwdCharts;
