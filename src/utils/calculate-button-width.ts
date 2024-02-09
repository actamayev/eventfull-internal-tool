export default function calculateButtonWidth(title: string): number {
	if (title === "Event Category") return 100
	else if (title === "Event Type") return 100
	else if (title === "Event") return 100
	else return 0
}
