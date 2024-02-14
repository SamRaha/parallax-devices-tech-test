import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import React from "react";

jest.mock("@aws-amplify/ui-react", () => ({
	Authenticator: ({ children }) => children({ signOut: jest.fn() }),
}));

test("renders App page", async () => {
	render(<App />);
	const linkElement = await screen.findByText(/Upload a CSV file containing device data./i);
	expect(linkElement).toBeInTheDocument();
});
