export const worker = () => {
	onmessage = (e) => {
		const { data } = e;
		const { propsString, cbString, args } = data;
		const f = new Function(propsString, cbString);

		const result = f(...args);

		new Promise(resolve => {
			resolve(result);
		}).then(data => {
			self.postMessage({ data });
		}).catch(error => self.postMessage({ error }));
	};
};
