function LPromise(execute) {
	this.status = "pending";
	this.value = null;
	this.reason = null;

	this.onFulfilledArray = [];
	this.onRejectedArray = [];

	const resolve = (value) => {
		queueMicrotask(() => {
			if (this.status === "pending") {
				this.value = value;
				this.status = "fulfilled";
				this.onFulfilledArray.forEach((func) => func(value));
			}
		});
	};

	const reject = (reason) => {
		queueMicrotask(() => {
			if (this.status === "pending") {
				this.reason = reason;
				this.status = "rejected";
				this.onRejectedArray.forEach((func) => func(reason));
			}
		});
	};

	execute(resolve, reject);
}

LPromise.prototype.then = function (onFulfilled, onRejected) {
	onFulfilled =
		typeof onFulfilled === "function"
			? onFulfilled
			: (data) => {
					return data;
			  };
	onRejected =
		typeof onRejected === "function"
			? onRejected
			: (reason) => {
					return reason;
			  };

	let promise2;

	if (this.status === "fullfilled") {
		return (promise2 = new LPromise((resolve, reject) => {
			queueMicrotask(() => {
				try {
					let result = onFulfilled(this.value);
					resolve(result);
				} catch (e) {
					reject(e);
				}
			});
		}));
	}

	if (this.status === "rejected") {
		return (promise2 = new LPromise((resolve, reject) => {
			queueMicrotask(() => {
				try {
					let result = onRejected(this.reason);
					resolve(result);
				} catch (e) {
					reject(e);
				}
			});
		}));
	}

	if (this.status === "pending") {
		return (promise2 = new LPromise((resolve, reject) => {
			this.onFulfilledArray.push(() => {
				try {
					let result = onFulfilled(this.value);
					resolve(result);
				} catch (e) {
					reject(e);
				}
			});
			this.onRejectedArray.push(() => {
				try {
					let result = onRejected(this.reason);
					resolve(result);
				} catch (e) {
					reject(e);
				}
			});
		}));
	}
};

module.exports = LPromise;
