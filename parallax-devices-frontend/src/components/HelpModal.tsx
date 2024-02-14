import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
	display: block;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
	color: #2a2a2a;
`;
const ModalContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.div`
	background-color: #fefefe;
	margin: 15% auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
	max-width: 900px;
	position: relative;
	z-index: 5;
	border-radius: 5px;
`;

interface HelpModalProps {
	show: boolean;
	onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
	const handleCloseModal = () => {
		onClose();
	};

	return (
		<>
			{show ? (
				<ModalBackdrop onClick={handleCloseModal} id="modalBackdrop">
					<ModalContainer>
						<ModalContent onClick={e => e.stopPropagation()}>
							<h2>How to Upload Your CSV File</h2>
							<p>Follow these steps to upload your CSV file containing device data:</p>
							<ul>
								<li>Select the CSV file you wish to upload.</li>
								<li>Ensure the file follows the required format, for example:</li>
								<li>Click the "Upload CSV" button to proceed.</li>
							</ul>
							<p>An example of a valid CSV file entry could look like this:</p>
							<pre style={{ backgroundColor: "#f5f5f5", padding: "10px", overflowX: "auto" }}>
								{`{
"id": "9b5ae8fb-539b-47ec-9850-8bdd980db782",
"name": "test 1",
"address": "523 Mason Drive\nElsiemouth\nWA3 3UR",
"longitude": "144.82261",
"latitude": "81.397612",
"device_type": "node",
"manufacturer": "CISCO",
"model": "F6810",
"install_date": "29/06/1981",
"notes": "Architecto quo voluptatem est eum voluptatem debitis suscipit. Neque accusantium eius quo est nemo dolores suscipit quia. Illum vel culpa vero est ad aperiam beatae.",
"eui": "94-5c-1c-68-2d-62",
"serial_number": "X0EPLL6X"
}`}
							</pre>
							<button onClick={onClose}>Close</button>
						</ModalContent>
					</ModalContainer>
				</ModalBackdrop>
			) : null}
		</>
	);
};

export default HelpModal;
