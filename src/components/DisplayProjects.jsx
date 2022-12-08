import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import React, { useState, useEffect, useCallback } from "react"
import service from "../api/service"
import Spinner from "./Spinner"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { Button } from "@mui/material"

const DisplayProjects = ({ id, votes, setVotes, step, setStep }) => {
	const [projects, setProjects] = useState([])
	const [canGoNext, setCanGoNext] = useState(false)

	const fetchProjects = async () => {
		const availableVotes = votes.filter(Boolean)
		const { data } = await service.get(
			`/projects?user=${id}${availableVotes
				.map((vote) => `&vote=${vote}`)
				.join("")}`
		)
		setProjects(data)
	}

	useEffect(() => {
		fetchProjects()
	}, [step])

	if (!projects.length) return <Spinner />

	const handleChange = (event) => {
		const copy = [...votes]
		copy[step - 1] = event.target.value
		setVotes(copy)
		setCanGoNext(true)
	}
	const prevPage = () => {
		votes[step - 2] = null
		setStep((current) => current - 1)
	}
	const nextPage = () => {
		setStep((current) => current + 1)
		setCanGoNext(false)
	}

	return (
		<>
			<FormControl>
				<FormLabel id="vote">
					{step === 1
						? "My Favorite 💖"
						: step === 2
						? "Loved it 😻"
						: "Liked it ✨"}
				</FormLabel>
				<RadioGroup
					aria-labelledby="vote"
					name="controlled-radio-buttons-group"
					value={votes[step - 1] || 1}
					onChange={handleChange}>
					{projects.map((project) => {
						return (
							<FormControlLabel
								key={project._id}
								value={project._id}
								control={<Radio />}
								label={project.name}
							/>
						)
					})}
				</RadioGroup>
			</FormControl>
			<div className="pages">
				{step > 1 && (
					<Button
						onClick={prevPage}
						variant="outlined"
						startIcon={<ArrowBackIosOutlinedIcon />}>
						Prev
					</Button>
					// <span className="arrow">
					// 	<ArrowBackIosOutlinedIcon onClick={prevPage} />
					// </span>
				)}
				{step > 0 && step < 4 && canGoNext && (
					<Button
						onClick={nextPage}
						variant="outlined"
						endIcon={<ArrowForwardIosIcon />}>
						Next
					</Button>
				)}
			</div>
		</>
	)
}

export default DisplayProjects
