export const getDeductionsData = (data) => {

    let { members = [] } = data;

    let perPaycheckDeductions = calculatePerPaycheckDeduction(members);
	let totalDeduction = calculateAnnualDeduction(members);
	let perMemberDeductions = calculatePerMemberDeduction(members);

	let response = {
		deductions : {
			totalDeduction,
			perMemberDeductions, 
			perPaycheckDeductions
		}
    }

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(response);
		}, 2000);
	});
};

export const calculatePerPaycheckDeduction = (members) => {

	let numOfAnnualPaychecks = 26;

	let totalAnnualDeduction = calculateAnnualDeduction(members);

	let deductions = [];

	for (let i = numOfAnnualPaychecks; i >= 1; i--) {
		var presentPayDeduction = (totalAnnualDeduction / i).toFixed(2);
		deductions.push({ paycheckNum: i, deduction : presentPayDeduction });
		totalAnnualDeduction -= presentPayDeduction;
	}

	deductions?.sort((a, b) => {
		return a.paycheckNum - b.paycheckNum;
	});

	return deductions;
};

const calculatePerMemberDeduction = (members) => {

	return members.map(m => {
		let res = {
			name: m.name,
			deduction: getAnnualDeduction(m)
		}
		return res;
	})
}

const calculateAnnualDeduction = (members) => {
	let annualDeduction = members.reduce((acc, m) => {
		let deduction = getAnnualDeduction(m);
		return acc + deduction;
	}, 0);

	return annualDeduction;
};

const getAnnualDeduction = (member) => {
	const { name } = member;

	const benefitsMap = {
		employee: 1000.0,
		dependent: 500.0,
	};

	let benefitsCost = benefitsMap[member.type];
	let cleanName = name.trim();

	if (cleanName.toUpperCase().charAt(0) === "A") {
		return benefitsCost * 0.9;
	} else {
		return benefitsCost;
	}
};
