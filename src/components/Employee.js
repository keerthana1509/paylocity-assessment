import React, { useState } from "react";

import * as Constants from "../constants/Contants";
import { getDeductionsData } from "../services/calculateDeductions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DeductionBreakdown from "./DataTables/DeductionBreakdown";

export default function Employee() {
	const [employeeName, setEmployeeName] = useState("");
	const [dependentName, setDependentName] = useState("");
	const [show, setShow] = useState(false);
	const [showNoEmp, setShowNoEmp] = useState(false);

	const [dependentList, setDependentList] = useState([]);

	const [deductionsData, setDeductionsData] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleCloseNoEmp = () => setShowNoEmp(false);
	const handleShowNoEmp = () => setShowNoEmp(true);

	const addDependents = (e) => {
		setDependentList((p) => [...p, dependentName]);

		setDependentName("");
		handleClose();
	};

	const calculateDeductions = () => {
		if (!employeeName) {
			handleShowNoEmp();
		} else {
			let employeeRequestData = [
				{
					name: employeeName,
					type: Constants.EMPLOYEE_TYPE,
				},
			];

			let dependentsRequestData = dependentList.map((d) => {
				return {
					name: d,
					type: Constants.DEPENDENT_TYPE,
				};
			});

			let reqData = {
				members: [...employeeRequestData, ...dependentsRequestData],
			};

			getDeductionsData(reqData)
				.then((data) => {
					let response = data.deductions || {};

					setDeductionsData(response);
				})
				.catch((error) => console.log(error));
		}
	};

	const renderPreviewTable = () => {
		const {
			totalDeduction,
			perMemberDeductions,
			perPaycheckDeductions = [],
		} = deductionsData;

		return (
			<div className="row text-center mt-9">
				<DeductionBreakdown
					deductionData={perMemberDeductions}
					total={totalDeduction}
				/>
				<div className="col-6 mt-6">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Paychecks Preview</h5>
							<div className="col-6">
								<table class="table">
									<thead>
										<tr>
											<th scope="col">Paycheck Number</th>
											<th scope="col">Deduction</th>
										</tr>
									</thead>
									<tbody>
										{perPaycheckDeductions.map((d) => {
											return (
												<tr key={d.paycheckNum}>
													<td>{d.paycheckNum}</td>
													<td>{d.deduction}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="container text-center mt-4">
			<div className="row">
				<div className="col-6">
					<div class="input-group mb-3">
						<label class="input-group-text" id="basic-addon1">
							Employee
						</label>
						<input
							type="text"
							class="form-control"
							placeholder="Provide name of the employee"
							aria-label="Provide name of the employee"
							aria-describedby="basic-addon1"
							value={employeeName}
							onChange={(e) => setEmployeeName(e.target.value)}
						/>
					</div>
					{dependentList.map((d) => {
						return (
							<div class="input-group mb-3">
								<label class="input-group-text" id="basic-addon1">
									Dependent
								</label>
								<input
									type="text"
									disabled
									class="form-control"
									placeholder="Provide name of the employee"
									aria-label="Provide name of the employee"
									aria-describedby="basic-addon1"
									value={d}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<div className="row">
				<div className="col-4">
					<button type="button" class="btn btn-primary" onClick={handleShow}>
						Add Dependents
					</button>
				</div>
				<div className="col-4">
					<button
						type="button"
						class="btn btn-primary"
						onClick={() => setDependentList([])}
					>
						Remove All Dependents
					</button>
				</div>
				<div className="col-4">
					<button
						type="button"
						class="btn btn-primary"
						onClick={calculateDeductions}
					>
						Calculate Deductions
					</button>
				</div>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Dependent</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<label class="input-group-text" id="basic-addon1">
						Name :
					</label>
					<input
						name="dependentName"
						type="text"
						class="form-control"
						placeholder="Provide name of the dependent"
						aria-label="Provide name of the dependent"
						aria-describedby="basic-addon1"
						value={dependentName}
						onChange={(e) => setDependentName(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={addDependents}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showNoEmp} onHide={handleCloseNoEmp}>
				<Modal.Header closeButton>
					<Modal.Title>No Employee, Please add employee</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseNoEmp}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			{/* <div className="row">
				<div className="col-4">
					<button type="button" class="btn btn-primary">
						Add Dependent
					</button>
				</div>
                <div className="col-4">
					<button type="button" class="btn btn-primary">
						Remove Dependents
					</button>
				</div>
			</div> */}
			{renderPreviewTable()}
		</div>
	);
}
