import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../components/Tables/Tables';
import Spiner from '../../components/Spiner/Spiner';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import { addData, dltdata, updateData } from '../../components/context/ContextProvider';
import { deletefunc, exporttocsvfunc, usergetfunc } from '../../services/Apis';
import "./Home.css"
import { toast } from 'react-toastify';

const Home = () => {

	const [userdata, setUserData] = useState([]);
	const [showspin, setShowSpin] = useState(true);
	const [serach, setSearch] = useState("");
	const [gender, setGender] = useState("All");
	const [status, setStatus] = useState("All");
	const [sort, setSort] = useState("new");
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const { useradd, setUseradd } = useContext(addData);
	const { update, setUpdate } = useContext(updateData);
	const { deletedata, setDLTdata } = useContext(dltdata);
	const navigate = useNavigate();

	const adduser = () => {
		navigate("/register");
	}

	// get user
	const userGet = async () => {
		const response = await usergetfunc(serach, gender, status, sort, page);
		if (response.status === 200) {
			setUserData(response.data.usersdata);
			setPageCount(response.data.Pagination.pageCount);
		} else {
			console.log("Eroor for get user data in home jsx userget function ");
		}
	}

	// user delete
	const deleteUser = async (id) => {
		const response = await deletefunc(id);
		if (response.status === 200) {
			userGet();
			setDLTdata(response.data)
		} else {
			console.log("Delete failed");
		}
	}

	// export user
	const exportuser = async () => {
		const response = await exporttocsvfunc();
		if (response.status === 200) {
			window.open(response.data.downloadUrl, "blank");
		} else {
			toast.error("haha ");
		}
	}

	// pagination
	// handle previ btn
	const handlePrevious = () => {
		setPage(() => {
			if (page === 1) return page;
			return page - 1;
		});
	}

	const handleNext = () => {
		setPage(() => {
			if (page === pageCount) return page;
			return page + 1;
		})
	}

	useEffect(() => {
		userGet();
		setTimeout(() => {
			setShowSpin(false);
		}, 1200)
	}, [serach, gender, status, sort, page]);

	return (
		<>
			{
				useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible >{useradd.fname.toUpperCase()} Successfuly ADDED</Alert> : ""
			}
			{
				update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible >{update.fname.toUpperCase()} Successfuly UPDATED</Alert> : ""
			}
			{
				deletedata ? <Alert variant="danger" onClose={() => setDLTdata("")} dismissible >{deletedata.fname.toUpperCase()} Successfuly DELETE</Alert> : ""
			}
			<div className="container">
				<div className="main_div">
					{/* Search Add Btn */}
					<div className="search_add mt-4 d-flex justify-content-between">
						<div className="search col-lg-4">
							<Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Search By Name"
									className="me-2"
									aria-label="Search"
									onChange={(e) => setSearch(e.target.value)}
								/>
								<Button variant="success" className='serach_btn'>Search</Button>
							</Form>
						</div>
						<div className="add_btn">
							<Button variant="primary" onClick={adduser}><i className="fa-solid fa-plus"></i>&nbsp;Add User</Button>
						</div>
					</div>
					{/* export to csv gender status */}
					<div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
						<div className="export_csv">
							<Button className='export_btn' onClick={exportuser}>Export to Csv</Button>
						</div>
						<div className='filter_gender'>
							<div className="filter">
								<h3>Filter By Gender</h3>
								<div className="gender d-flex justify-content-around">
									<Form.Check
										type={'radio'}
										label={`All`}
										name="gender"
										value={"All"}
										onChange={(e) => setGender(e.target.value)}
										defaultChecked
									/>
									<Form.Check
										type={'radio'}
										label={`Male`}
										name="gender"
										value={"Male"}
										onChange={(e) => setGender(e.target.value)}
									/>
									<Form.Check
										type={'radio'}
										label={`Female`}
										name="gender"
										value={"Female"}
										onChange={(e) => setGender(e.target.value)}
									/>
								</div>
							</div>
						</div>
						{/* Sort by value  */}
						<div className="filter_newold">
							<h3>Sort By Value</h3>
							<Dropdown className='text-center'>
								<Dropdown.Toggle className='dropdown_btn' id='dropdown-basic'>
									<i className='fa-solid fa-sort'></i>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
									<Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
						{/* Filter by Status */}
						<div className="filter_status">
							<div className="status">
								<h3>Filter By Status</h3>
								<div className="status_radio d-flex justify-content-around flex-wrap">
									<Form.Check
										type={'radio'}
										label={`All`}
										name="status"
										value={"All"}
										onChange={(e) => setStatus(e.target.value)}
										defaultChecked
									/>
									<Form.Check
										type={'radio'}
										label={`Active`}
										name="status"
										value={"Active"}
										onChange={(e) => setStatus(e.target.value)}
									/>
									<Form.Check
										type={'radio'}
										label={`InActive`}
										name="status"
										value={"InActive"}
										onChange={(e) => setStatus(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				{
					showspin ? <Spiner /> : <Tables userdata={userdata} deleteUser={deleteUser} userGet={userGet} handlePrevious={handlePrevious} handleNext={handleNext} page={page} pageCount={pageCount} setPage={setPage} />
				}
			</div >
		</>
	)
}

export default Home