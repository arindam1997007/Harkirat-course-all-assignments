function calculateSum(a, b) {
    return a + b;
}
var x = calculateSum(2, 3);
console.log({ x: x });
function greetPerson(person) {
    return "Hello ".concat(person.name, ".\n\t\t Good Evening!");
}
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.greet = function () {
            return 12;
        };
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var p1 = new Person("arindam", 26);
var renderShape = function (shape) {
    console.log(shape.radius, shape.side, shape.width, shape.length);
};
renderShape({ radius: 2, side: 4, width: 3, length: 4 });
