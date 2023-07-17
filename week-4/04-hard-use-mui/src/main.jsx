import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { RecoilRoot } from "recoil"

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontFamily: ["Aleo", "Helvetica Neue", "Arial", "sans-serif"].join(","),
		fontSize: 16,
		h1: {
			fontSize: "2.25rem",
			lineHeight: 1.1,
			"@media (width > 1200px)": {
				fontSize: "3rem",
			},
		},
		h2: {
			fontSize: "2rem",
			lineHeight: 1.15,
			"@media (min-width:1200px)": {
				fontSize: "2.75rem",
			},
		},
		h3: {
			fontSize: "1.75rem",
			lineHeight: 1.2,
			"@media (min-width:1200px)": {
				fontSize: "2.5rem",
			},
		},
		h4: {
			fontSize: "1.5rem",
			lineHeight: 1.25,
			"@media (min-width:1200px)": {
				fontSize: "2.25rem",
			},
		},
		h5: {
			fontSize: "1.25rem",
			lineHeight: 1.3,
			"@media (min-width:1200px)": {
				fontSize: "2rem",
			},
		},
		h6: {
			fontSize: "0.875rem",
			lineHeight: 1.4,
			"@media (min-width:1200px)": {
				fontSize: "1.75rem",
			},
		},
	},
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</RecoilRoot>
	</React.StrictMode>
)
