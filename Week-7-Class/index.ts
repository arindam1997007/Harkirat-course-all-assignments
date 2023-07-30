function calculateSum(a: number, b: number) {
	return a + b
}

const x = calculateSum(2, 3)
console.log({ x })

interface Person {
	name: string
	age: number
	greetme(): string
}

function greetPerson(person: Person): string {
	return `Hello ${person.name}.
		 Good Evening!`
}

class Person implements Person {
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
	greet = () => {
		return 12
	}
}

const p1 = new Person("arindam", 26)

interface Circle {
	radius: number
	borderWidth?: number // Optional parameter
}
interface Square {
	side: number
}
interface Rectangle {
	width: number
	length: number
}

type Shape = Circle & Rectangle & Square

const renderShape = (shape: Shape) => {
	const { radius: radiusValue } = shape
	console.log(radiusValue, shape.side, shape.width, shape.length)
}

renderShape({ radius: 2, side: 4, width: 3, length: 4 })

enum Arithmetic {
	Add,
	Sub,
	Div,
	Mul,
}

function calculateArithmetic(a: number, b: number, type: Arithmetic): number {
	return 1
}

const ans = calculateArithmetic(2, 3, Arithmetic.Add)
