import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	return (
		<>
			<h1>CourseBuy</h1>
			<Link href='/signup'>SignUp</Link>
		</>
	)
}
