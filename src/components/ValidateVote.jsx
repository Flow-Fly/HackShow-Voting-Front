import { Button } from "@mui/material"
import React, { useState } from "react"
import { useEffect } from "react"
import service from "../api/service"
import Spinner from "./Spinner"

const ValidateVote = ({ votes, username: user, setStep, setLoading }) => {
	const [allVotes, setAllVotes] = useState([])

	const fetchProjects = async () => {
		const availableVotes = votes.filter(Boolean)
		try {
			const { data } = await service.get(
				`/projects/validate?${availableVotes
					.map((vote) => `&vote=${vote}`)
					.join("")}`
			)
			setAllVotes(data)
		} catch (error) {
			console.log(error.message)
		}
	}
	const vote = async () => {
		try {
			const { data } = await service.post("/projects", {
				votes,
				id: user._id,
			})
			setLoading(true)
			setTimeout(() => {
				setStep((current) => current + 1)
				setLoading(false)
			}, 300)
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		fetchProjects()
	}, [])

	if (!allVotes.length) return <Spinner />
	return (
		<>
			<h2>You're voting for:</h2>
			<ul>
				{allVotes.map((project, i) => {
					return (
						<li key={project._id}>
							{project.name} +{i === 0 ? "3pts" : i === 1 ? "2pts" : "1pt"}
						</li>
					)
				})}
			</ul>
			<Button variant="outlined" onClick={vote}>
				Let's vote!
			</Button>
		</>
	)
}

export default ValidateVote
