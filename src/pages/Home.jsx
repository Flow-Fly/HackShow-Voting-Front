import React, { useState } from "react"
import service from "../api/service"
import useDebounce from "../hooks/useDebounce"
import ValidateName from "../components/ValidateName"
import "./Home.css"
import DisplayProjects from "../components/DisplayProjects"
import Spinner from "../components/Spinner"
import ValidateVote from "../components/ValidateVote"
import Thanks from "../components/Thanks"

const Home = () => {
	const [username, setUsername] = useState("")
	const [nameList, setNameList] = useState([])
	const [step, setStep] = useState(0)
	const [loading, setLoading] = useState(false)
	const [votes, setVotes] = useState([])
	const [error, setError] = useState("")

	useDebounce(
		async () => {
			if (typeof username === "object") return
			try {
				const { data } = await service.get(`/user?name=${username}`)
				setNameList(data)
			} catch (error) {
				console.log(error)
			}
		},
		[username],
		200
	)

	const verifyUsername = async () => {
		try {
			const res = await service.get(`/user/votes?name=${username.username}`)
			if (res.status === 200) {
				setLoading(true)
				setTimeout(() => {
					setStep((current) => current + 1)
					setLoading(false)
				}, 300)
			}
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	if (loading) return <Spinner />
	return (
		<div className="Home">
			{step === 0 && (
				<>
					<ValidateName {...{ nameList, verifyUsername, setUsername, error }} />
				</>
			)}
			{step >= 1 && step <= 3 && (
				<DisplayProjects
					{...{ id: username._id, votes, setVotes, step, setStep }}
				/>
			)}

			{step === 4 && (
				<ValidateVote {...{ votes, username, setStep, setLoading }} />
			)}
			{step === 5 && <Thanks {...{ username }} />}
		</div>
	)
}

export default Home
