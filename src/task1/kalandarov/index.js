import { Node } from './Node.js';

const trie = (root, ...levels) => {
	if (levels.length === 0) {
		return root;
	}

	const count = levels.shift();

	for (let i = 0; i < count; i++) {
		const node = new Node();
		trie(node, ...levels);
		root.add(node);
	}

	return root;
};

const root = new Node();

trie(root, 2, 4, 10, 5);

//structure
root.travers((node, depth) => {
	console.log('-'.repeat(depth) + '>' + node.id);

	return depth + 1;
}, 0);
