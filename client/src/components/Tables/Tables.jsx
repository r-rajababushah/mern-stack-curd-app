import React from 'react';
import "./Table.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from "react-bootstrap/Badge";
import { BASE_URL } from '../../services/helper';
import { statuschangefunc } from '../../services/Apis';
import { ToastContainer, toast } from "react-toastify";
import Paginations from '../pagination/Paginations';

const Tables = ({ userdata, deleteUser, userGet, handlePrevious, handleNext, page, pageCount, setPage }) => {

	const handleChange = async (id, status) => {
		const response = await statuschangefunc(id, status);
		if (response.status === 200) {
			userGet();
			toast.success("User Status Changed");
		} else {
			toast.error("Something Went Wrong At Server Code");
			console.log("Error in table in changing data at statuschangefunc request");
		}
	}

	return (
		<>
			<div className="container">
				<Row>
					<div className="col mt-0">
						<Card className='shadow'>
							<Table className='align-items-center' responsive="sm">
								<thead className="thead-dark">
									<tr className='table-dark'>
										<th>ID</th>
										<th>FullName</th>
										<th>Email</th>
										<th>Gender</th>
										<th>Status</th>
										<th>Profile</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{
										userdata.length > 0 ? userdata.map((element, index, key) => {
											return (
												<tr key={Number(index)}>
													<td>{index + 1 + (page - 1)*4}</td>
													<td>{element.fname + " " + element.lname}</td>
													<td>{element.email}</td>
													<td>{element.gender}</td>
													<td className='d-flex align-items-center'>
														<Dropdown className='text-center'>
															<Dropdown.Toggle className='dropdown_btn' id='dropdown-basic'>
																<Badge bg={element.status == "Active" ? "primary" : "danger"}>
																	{element.status}<i className='fa-solid fa-angle-down'></i>
																</Badge>
															</Dropdown.Toggle>

															<Dropdown.Menu>
																<Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
																<Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</td>
													<td className='img_parent'>
														<img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
													</td>
													<td>
														<Dropdown className='text-center'>
															<Dropdown.Toggle variant='light' className='action' id='dropdown-basic'>
																<i className='fa-solid fa-ellipsis-vertical'></i>
															</Dropdown.Toggle>

															<Dropdown.Menu>
																<Dropdown.Item onClick={() => { window.location.href = `/userprofile/${element._id}` }}>
																	<i className='fa-solid fa-eye' style={{ color: "green" }}></i> <span>View</span>
																</Dropdown.Item>
																<Dropdown.Item onClick={() => { window.location.href = `/edit/${element._id}` }}>
																	<i className='fa-solid fa-edit' style={{ color: "blue" }}></i> <span>Edit</span>
																</Dropdown.Item>
																<Dropdown.Item onClick={() => deleteUser(element._id)}>
																	<i className='fa-solid fa-trash' style={{ color: "red" }}></i> <span>Delete</span>
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</td>
												</tr>
											)
										}) : <tr>
											<td colSpan="7" className='no_data text-center'>
												No Data Found
											</td>
										</tr>
									}
								</tbody>
							</Table>
							<Paginations
								handlePrevious={handlePrevious}
								handleNext={handleNext}
								page={page}
								pageCount={pageCount}
								setPage={setPage}
							/>
						</Card>
					</div>
				</Row >
				<ToastContainer />
			</div >
		</>
	)
}

export default Tables