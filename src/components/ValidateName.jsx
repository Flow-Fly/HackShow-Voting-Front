import React from "react"
import { Box } from "@mui/material"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import { Button, Typography } from "@mui/material"
import HowToRegIcon from "@mui/icons-material/HowToReg"

const ValidateName = ({ nameList, verifyUsername, setUsername }) => {
	return (
		<Stack direction="row" spacing={4}>
			<Autocomplete
				id="Username selection"
				sx={{ width: 300 }}
				options={nameList}
				autoHighlight
				onChange={(e, value) => setUsername(value)}
				getOptionLabel={(option) => option.username}
				renderOption={(props, option) => (
					<Box
						component="li"
						sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
						{...props}>
						<Stack direction="row" spacing={2}>
							<Avatar
								alt={option.username}
								src={option.photo}
								sx={{ width: 24, height: 24 }}
							/>
							<Typography>{option.username}</Typography>
						</Stack>
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search your github username"
						inputProps={{
							...params.inputProps,
							autoComplete: "false", // disable autocomplete and autofill
						}}
						onChange={(e) => setUsername(e.target.value)}
					/>
				)}
			/>
			<Button
				onClick={verifyUsername}
				variant="outlined"
				endIcon={<HowToRegIcon />}>
				Vote
			</Button>
		</Stack>
	)
}

export default ValidateName
