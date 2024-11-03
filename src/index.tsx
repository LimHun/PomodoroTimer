import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1e1e1e;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const queryClient = new QueryClient();

ReactDOM.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<GlobalStyle />
			<App />
		</BrowserRouter>
	</QueryClientProvider>,
	document.getElementById("root")
);
