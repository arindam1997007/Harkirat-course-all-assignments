// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ensureDBConnected } from "@/lib/dbConnect"
import type { NextApiRequest, NextApiResponse } from "next"
import { Admin } from "db"
const jwt = require("jsonwebtoken")

const ACCESS_SECRET_KEY =
	"7bce43657b1b87a0c495a173fa00c90d10edbcf7d62e69cfc4989cbce63010c93762eef1c78a6ce6bee8df67e1743349d56ec11bf721184a260833cce965cc02"

type ReturnData = {
	token?: string
	message?: string
}

const isAdminUsernameExist = async (username: string) => {
	try {
		const query = Admin.where({ username })
		const admin = await query.findOne()
		return admin
	} catch (error: any) {
		const errorMsg = error?.message || ""
		throw new Error(errorMsg)
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ReturnData>
) {
	await ensureDBConnected()
	const reqBody = JSON.parse(req.body)
	const { username, password } = reqBody

	if (!username || !password) {
		return res.status(400).json({ message: "Missing username or password" })
	}

	try {
		const findAdmin = await isAdminUsernameExist(username)
		if (!!findAdmin)
			return res.status(400).json({ message: "Username already in use" })

		const admin = new Admin({ username, password })
		await admin.save()
		const accessToken = jwt.sign({ username }, ACCESS_SECRET_KEY)
		res.status(200).json({ token: accessToken })
	} catch (error: any) {
		const message = error?.message || ""
		res.status(500).json({ message: message })
	}
}
