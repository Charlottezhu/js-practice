const LPromise = require("./LPromise");

new LPromise((resolve, reject) => {
	setTimeout(() => {
		resolve("hello");
	}, 1000);
})
	.then((res) => {
		console.log(res);
		return res + "luyi";
		// hello luyi
	})
	.then((res) => {
		console.log(res);
	});
