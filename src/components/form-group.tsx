interface Props {
	as?: React.ElementType
	className?: string
	label?: string
	max?: string
	minDate?: string
	minValue?: number
	maxLength?: number
	name?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	pattern?: string
	placeholder?: string
	required?: boolean
	rows?: number
	type?: string
	step?: number
	value?: string
	children?: React.ReactNode
}

export default function FormGroup(props: Props) {
	const {
		as,
		className,
		label,
		max,
		minDate,
		minValue,
		maxLength,
		name,
		onChange,
		pattern,
		placeholder,
		required,
		rows,
		type,
		step,
		value,
		children,
	} = props
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const Component = as || "input"

	const minAttribute = type === "datetime-local" ? minDate : minValue

	return (
		<div className= {`mb-4 ${className}`}>
			{label && <label className = "block text-sm font-medium text-gray-600">{label}</label>}
			<Component
				className ="mt-1 p-2 w-full border rounded-md text-black"
				max={max}
				min = {minAttribute}
				maxLength = {maxLength}
				name = {name}
				onChange = {onChange}
				pattern = {pattern}
				placeholder = {placeholder}
				required = {required}
				rows = {rows}
				type = {type || "text"}
				step = {step}
				value = {value}
			>
				{children}
			</Component>
		</div>
	)
}
