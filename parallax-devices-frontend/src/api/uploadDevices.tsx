import axios from "axios";

const uploadDevices = async (jsonArray: any[]) => {
	try {
		const response = await axios.post("http://localhost:3000/devices", jsonArray, {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": "91ff0343-001a-4abd-a7cf-ad818430d5c0",
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export default uploadDevices;
