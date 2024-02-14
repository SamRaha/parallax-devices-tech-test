import React from "react";
import "./App.css";
import CSVUpload from "./components/CSVUpload";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import styled from "styled-components";
import Navbar from "./components/Navbar";

Amplify.configure(awsExports);

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	min-height: 100vh;
	position: relative;
	flex-direction: column;
	color: #2a2a2a;
	font-family: Matter, sans-serif;
`;

const Main = styled.div`
	padding: 24px;
`;

const App: React.FC = () => {
	return (
		<Authenticator>
			{({ signOut }) => (
				<Container>
					<Navbar signOut={signOut ? signOut : () => {}} />
					<Main>
						<h3>Upload a CSV file containing device data</h3>
						<CSVUpload />
					</Main>
				</Container>
			)}
		</Authenticator>
	);
};

export default App;
