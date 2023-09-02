import { Client } from "pg"

export async function getClient() {
	const client = new Client(
		"postgres://bpndrcgd:c4JHuBeClHl84u9U7Dctn01TsSMnHTPw@topsy.db.elephantsql.com/bpndrcgd"
	)
	await client.connect()
	return client
}
