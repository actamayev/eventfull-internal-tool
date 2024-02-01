import _ from "lodash"

interface Props {
	message: string
  }

export default function SuccessMessage(props: Props) {
	const { message } = props

	if (_.isEmpty(message)) return null

	return (
		<div
			className="mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
		>
			{message}
		</div>
	)
}
