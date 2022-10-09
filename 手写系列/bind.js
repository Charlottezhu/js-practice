const o1 = {
	text: "o1",
	fn: function (...rest) {
		console.log(this.text, ...rest);
	},
};
const o2 = {
	text: "a",
};

Function.prototype.bind2 = function (context) {
	if (typeof this !== "function") {
		console.error("not a function");
	}
	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);
	return function (...innerArgs) {
		self.apply(context, [...args, ...innerArgs]);
	};
};

const m = o1.fn.bind2(o2, "b", "c");
m("aa", "bb");
