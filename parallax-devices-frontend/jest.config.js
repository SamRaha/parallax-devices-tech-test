// jest.config.js
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy", // Correctly mock CSS modules
	},

	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transform JS and TS files
		// Remove the line for CSS files here; they're handled by moduleNameMapper
	},
};
