import { useState, useEffect } from "react"

interface Props {
	variable: string
	maxLength: number
	variableName?: string
}

export default function CharacterLimit (props: Props) {
	const { variable, maxLength, variableName } = props
	const [isVariableOverLimit, setIsVariableOverLimit] = useState(false)

	useEffect(() => {
		if (variable || variable === "") {
			setIsVariableOverLimit(variable.length >= maxLength)
		}
	}, [variable])

	const counterStyleLimit = () => {
		if (isVariableOverLimit) return {color: "red"}
		return {color: "black"}
	}

	return (
		<div style = {counterStyleLimit()}>
			{variableName} Character Limit: {variable.length} / {maxLength}
		</div>
	)
}
