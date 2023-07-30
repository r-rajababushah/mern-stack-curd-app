import React, { useEffect, useState } from 'react'
import "./Profile.css"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Spinner from "../../components/Spiner/Spiner";
import { useParams } from 'react-router-dom';
import { singleUsergetfunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import moment from "moment";

const Profile = () => {

	const [userdata, setUserData] = useState([]);
	const [showspin, setShowSpin] = useState(true);

	const { id } = useParams();
	const userProfileGet = async () => {
		const response = await singleUsergetfunc(id);

		if (response.status == 200) {
			setUserData(response.data);
		}else {
			console.log(error);
		}
	}

	useEffect(() => {
		userProfileGet();
		setTimeout(() => {
			setShowSpin(false);
		}, 1200);
	}, [id])

	return (
		<>
			{
				showspin ? <Spinner /> :
					<div className="container">
						<Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
							<Card.Body>
								<Row>
									<div className="col">
										<div className="card-profile-stats d-flex justify-content-center">
											<img src={`${BASE_URL}/uploads/${userdata.profile}`} alt="img" />
										</div>
									</div>
								</Row>
								<div className="text-center">
									<h3>{userdata.fname + " " + userdata.lname}</h3>
									<h4><i className="fa-solid fa-envelope email"></i>&nbsp;:- <span>{userdata.email}</span></h4>
									<h5><i className="fa-solid fa-mobile"></i>&nbsp;:- <span>{userdata.mobile}</span></h5>
									<h4><i className="fa-solid fa-person"></i>&nbsp;:- <span>{userdata.gender}</span></h4>
									<h5><i className="fa-solid fa-location-dot location"></i>&nbsp;:- <span>{userdata.location}</span></h5>
									<h4><i className="fa-solid fa-wifi"></i>&nbsp; Status &nbsp;:- <span>{userdata.status}</span></h4>
									<h5><i className="fa-solid fa-calendar-days calender"></i> &nbsp; Date Created&nbsp;:- <span>{moment(userdata.datecreated).format("DD-MM-YYYY")}</span></h5>
									<h5><i className="fa-solid fa-calendar-days calender"></i> &nbsp; Date Updated&nbsp;:- <span>{Date()}</span></h5>
								</div>
							</Card.Body>
						</Card>
					</div>
			}
		</>
	)
}

export default Profile