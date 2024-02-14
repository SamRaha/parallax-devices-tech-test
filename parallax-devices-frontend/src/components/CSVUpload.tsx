import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import uploadDevices from "../api/uploadDevices";
import csv from "csvtojson";
import HelpModal from "./HelpModal";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	color: #2a2a2a;
	padding: 24px;
	background-color: #f5f5f5;
`;

interface ButtonProps {
	$help?: boolean;
}

const Button = styled.button<ButtonProps>`
	padding: 12px 24px;
	background-color: #1064a3;
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-size: 16px;
	margin: 12px;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: #0d5580;
	}

	${({ $help }) =>
		$help &&
		css`
			background-color: #fabc09;
			color: #2a2a2a;
			&:hover {
				background-color: #db9b06;
			}
		`}
`;

const FileInput = styled.input`
	margin: 20px 0;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: calc(100% - 24px);
`;

const Success = styled.p`
	color: #28a745;
	font-weight: 600;
	margin: 12px;
`;

const PreviewContainer = styled.div`
	margin-top: 20px;
	border: 1px solid #ccc;
	background-color: #fff;
	padding: 20px;
	overflow-x: auto;
	text-align: left;
	font-size: 14px;
	width: 100%;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 8px;

	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
		max-width: 100%;
	}
`;

const convertCSVToJson = (file: File): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.onload = async event => {
			try {
				if (event.target?.result) {
					const csvData = event.target.result as string;
					const jsonArray = await csv().fromString(csvData);
					resolve(jsonArray);
				}
			} catch (error) {
				reject(error);
			}
		};
		fileReader.onerror = error => reject(error);
		fileReader.readAsText(file);
	});
};

const CSVUpload: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			setFile(files[0]);
			generatePreview(files[0]);
			setUploadSuccess(false);
		}
	};
	const generatePreview = async (file: File) => {
		try {
			const jsonArray = await convertCSVToJson(file);
			setPreview(JSON.stringify(jsonArray.slice(0, 100), null, 2));
		} catch (error) {
			console.error("Error generating preview:", error);
			setPreview("");
		}
	};

	const handleFileUpload = async () => {
		if (file) {
			try {
				const jsonArray = await convertCSVToJson(file);
				const response = await uploadDevices(jsonArray);
				if (response) {
					setUploadSuccess(true);
				}
			} catch (error) {
				console.error(error);
				setUploadSuccess(false);
			}
		}
	};
	return (
		<Container>
			<HelpModal show={isModalOpen} onClose={() => setIsModalOpen(false)} />
			<FileInput type="file" accept=".csv" onChange={handleFileChange} />
			<Button onClick={handleFileUpload}>Upload CSV</Button>
			{uploadSuccess ? <Success>File uploaded successfully!</Success> : null}
			<Button $help={true} onClick={() => setIsModalOpen(true)}>
				Help
			</Button>
			{preview ? (
				<PreviewContainer>
					<strong>Preview:</strong>
					<pre>{preview}</pre>
				</PreviewContainer>
			) : null}
		</Container>
	);
};

export default CSVUpload;
