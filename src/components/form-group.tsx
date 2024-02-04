interface Props {
	as?: React.ElementType
	className?: string
	id?: string
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
		id,
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
		<div id = {id} className= {`mb-4 ${className}`}>
			{label && <label htmlFor = {id} className = "block text-sm font-medium text-gray-600">{label}</label>}
			<Component
				className ="mt-1 p-2 w-full border rounded-md text-gray-900"
				id = {id}
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
