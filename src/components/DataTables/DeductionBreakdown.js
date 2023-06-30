import React from "react";

export default function DeductionBreakdown({ deductionData, total }) {
	return (
		<div className="col-4 mt-6">
			<div>
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Total Deductions</h5>
						{deductionData && deductionData.length > 0 && (
							<>
								<table class="table">
									<thead>
										<tr>
											<th scope="col">Memebr Name</th>
											<th scope="col">Deduction</th>
										</tr>
									</thead>
									<tbody>
										{deductionData.map((d) => {
											return (
												<tr key={d.name}>
													<td>{d.name}</td>
													<td>{d.deduction}</td>
												</tr>
											);
										})}
										<br></br>
										<br></br>
										<tr>
											<td>
												<strong>Total</strong>
											</td>
											<td>
												<strong>{total}</strong>
											</td>
										</tr>
									</tbody>
								</table>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
