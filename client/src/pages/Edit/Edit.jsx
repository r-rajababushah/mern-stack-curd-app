import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import Spiner from '../../components/Spiner/Spiner';
import 'react-toastify/dist/ReactToastify.css';
import "./Edit.css"
import { editfunc, singleUsergetfunc } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../services/helper';
import { updateData } from '../../components/context/ContextProvider';

const Edit = () => {

	const [inputdata, setInputData] = useState({
		fname: "",
		lname: "",
		email: "",
		mobile: "",
		gender: "",
		location: "",
	});

	const [status, setStatus] = useState("Active");
	const [imgdata, setImgdata] = useState("");
	const [image, setImage] = useState("");
	const [preview, setPreview] = useState("");
	const {update, setUpdate} = useContext(updateData);
	const [showspin, setShowSpin] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	// Status Options
	const options = [
		{ value: 'Active', label: 'Active' },
		{ value: 'InActive', label: 'InActive' },
	]

	// Set Input Vlaue
	const setInputValue = (e) => {
		const { name, value } = e.target;
		setInputData({ ...inputdata, [name]: value })
	}

	// Status Set
	const setStatusValue = (e) => {
		setStatus(e.value)
	}

	// proifle set
	const setProfile = (e) => {
		setImage(e.target.files[0]);
	}

	const userProfileGet = async () => {
		const response = await singleUsergetfunc(id);

		if (response.status == 200) {
			setInputData(response.data);
			console.log(response.data);
			setStatus(response.data.status);
			setImgdata(response.data.profile);
		} else {
			console.log(error);
		}
	}

	// submit user data
	const submitUserData = async (e) => {
		e.preventDefault();

		const { fname, lname, email, mobile, gender, location } = inputdata;

		if (fname === "") {
			toast.error("First Name is requried");
		} else if (lname === "") {
			toast.error("Last Name is requried");
		} else if (email === "") {
			toast.error("Email is requried");
		} else if (!email.includes("@")) {
			toast.warn("Enter a valid email ");
		} else if (gender === "") {
			toast.error("Gender is required");
		} else if (location === "") {
			toast.error("Location is required");
		} else if (status === "") {
			toast.error("Status is requried");
		} else {
			const data = new FormData();
			data.append("fname", fname);
			data.append("lname", lname);
			data.append("email", email);
			data.append("mobile", mobile);
			data.append("gender", gender);
			data.append("status", status);
			data.append("user_profile", image || imgdata);
			data.append("location", location);

			const config = {
				"Content-Type": "multipart/form-data"
			}

			const response = await editfunc(id, data, config);
			if (response.status == 200) {
				setUpdate(response.data);
				navigate("/");
			}
		}

	}

	
	useEffect(() => {
		userProfileGet();
		setTimeout(() => {
			setShowSpin(false);
		});
	}, [])

	useEffect(() => {
		if (image) {
			setPreview(URL.createObjectURL(image))
		};
	}, [image]);


	return (
		<>
			{
				showspin ? <Spiner /> : <div className="container">
					<h2 className="text-center mt-1">Update Your Details</h2>
					<Card className='shadow mt-3 p-3'>
						<div className="profile_div text-center">
							<img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="img" />
						</div>
						<Form>
							<Row>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicFname">
									<Form.Label>First Name</Form.Label>
									<Form.Control type="text" name="fname" value={inputdata.fname} onChange={setInputValue} placeholder='Enter First Name' />
								</Form.Group>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicLname">
									<Form.Label>Last Name</Form.Label>
									<Form.Control type="text" name="lname" value={inputdata.lname} onChange={setInputValue} placeholder='Enter Last Name' />
								</Form.Group>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" name="email" value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
								</Form.Group>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicMobile">
									<Form.Label>Mobile</Form.Label>
									<Form.Control type="text" name="mobile" value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' />
								</Form.Group>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicGender">
									<Form.Label>Your Gender</Form.Label>
									<Form.Check
										type={'radio'}
										label={`Male`}
										name="gender"
										value={"Male"}
										onChange={setInputValue}
										checked={inputdata.gender == "Male" ? true : false}
									/>
									<Form.Check
										type={'radio'}
										label={`Female`}
										name="gender"
										value={"Female"}
										onChange={setInputValue}
										checked={inputdata.gender == "Female" ? true : false}
									/>
								</Form.Group>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicStatus">
									<Form.Label>Select Your Status</Form.Label>
									<Select options={options} placeholder={status} value={status} onChange={setStatusValue} />
								</Form.Group>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
									<Form.Label>Enter Profile</Form.Label>
									<Form.Control type="file" onChange={setProfile} name="user_profile" />
								</Form.Group>
								<Form.Group className="mb-3 col-lg-6" controlId="formBasicLocation">
									<Form.Label>Enter Your Location</Form.Label>
									<Form.Control type="text" name="location" value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' />
								</Form.Group>
								<Button variant="primary" type="submit" onClick={submitUserData}>
									Submit
								</Button>
							</Row>
						</Form>
					</Card>
					<ToastContainer position="top-center" theme="colored" />
				</div>
			}

		</>
	)
}

export default Edit