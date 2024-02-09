interface Props {
	title: string
	children: React.ReactNode
}

export default function CardTemplate(props: Props) {
	const { title, children } = props

	return (
		<div className = "flex justify-center">
			<div className = "bg-white border shadow rounded-lg p-6 w-11/12 mx-auto">
				<h1
					className = "flex mx-auto mb-4 text-5xl font-extrabold \
						leading-none tracking-tight text-black"
				>
					{title}
				</h1>
				{children}
			</div>
		</div>
	)
}
