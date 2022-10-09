var array = ["a", "b"];

Function.prototype.call2 = function (context, ...args) {
	var context = context || window;
	context.fn = this;
	var result = context.fn(...args);
	delete context.fn;
	return result;
};
array.push.call2(array, "0", "1", "2");
console.info(array);
