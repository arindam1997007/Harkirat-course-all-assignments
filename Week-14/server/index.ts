import { z } from "zod"
import { publicProcedure, router } from "./trpc"
import { createHTTPServer } from "@trpc/server/adapters/standalone"

const todoInputType = z.object({
	title: z.string(),
	description: z.string(),
})

const signupType = z.object({
	email: z.string(),
	password: z.string(),
})

const appRouter = router({
	createTodo: publicProcedure.input(todoInputType).mutation(async opts => {
		const { title, description } = opts.input
		return {
			id: "1",
		}
	}),
	signUp: publicProcedure.input(signupType).mutation(async opts => {
		const { email, password } = opts.input
		const { username } = opts.ctx
		return {
			token: "12345ABC",
		}
	}),
})

const server = createHTTPServer({
	router: appRouter,
	createContext(opts) {
		let authHeader = opts.req.headers["authorization"]
		console.log({ authHeader })
		return {
			username: "user",
		}
	},
})

server.listen(3000)

export type AppRouter = typeof appRouter
