export const createBlob = (str) => {
	const blob = new Blob([str], {type: 'application/javascript'})
	return URL.createObjectURL(blob);
}