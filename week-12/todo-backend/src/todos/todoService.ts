import { Todo } from "./todo"

export type TodoCreationParams = Pick<Todo, "title" | "description">

export class TodoService {
	public get(todoId: string): Todo {
		return {
			id: todoId,
			title: "mock todo",
			description: "mock description",
			done: false,
		}
	}
	public create(params: TodoCreationParams): Todo {
		console.log("mock db call")
		return {
			id: new Date().getTime().toString(),
			title: "mock todo",
			description: "mock description",
			done: false,
		}
	}
}
