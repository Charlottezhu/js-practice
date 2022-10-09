var foo = {
	value: 1,
};
function bar() {
	console.log(this.value);
}
//bar.apply(foo);

Function.prototype.apply2 = function (context, arr) {
	var context = context || window;
	context.fn = this;
	var result;
	if (!arr) {
		result = context.fn();
	} else {
		result = context.fn(...arr);
	}
	delete context.fn;
	return result;
};

bar.apply2(foo);

var array = ["a", "b"];
var elements = [0, 1, 2];
array.push.apply2(array, elements);
console.info(array);
