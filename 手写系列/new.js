//1. new 创建了一个对象，这个对象，指向了构造函数的原型。
//2. 该对象，实现了 这个构造函数的方法。
//3. 根据一些特定情况，返回对象
//1. 如果 这个构造函数，没有返回值，或者返回一个基本类型，那么，最后返回，我创建的这个对象；
//2. 如果 有返回值，且是个对象，则返回这个对象
function Person(name) {
	this.name = name;
}

const p = new Person("me");
console.log(p.name);

function newFunc(Father) {
	var obj = Object.create(Father.prototype);
	const result = Father.apply(obj, Array.prototype.slice.call(arguments, 1));
	return result && typeof result === "object" ? result : obj;
}

const p2 = newFunc(Person, "you");
console.log(p2.name);

// use new to write Object.create();

function inherit(obj) {
	function f() {}
	f.prototype = obj;
	f.prototype.constructor = f;
	return new f();
}
