import React from "react";
import styled from "styled-components";
import LogoSrc from "../assets/logo.svg";

const Container = styled.div`
	padding: 24px;
	height: 87px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
`;

const SignOutButton = styled.button`
	z-index: 3;
	background-color: #2a2a2a;
	color: #fff;
	text-align: center;
	text-transform: uppercase;
	border-radius: 100px;
	justify-content: center;
	align-items: center;
	padding: 1.042vw 1.944vw;
	font-size: 0.764vw;
	font-weight: 500;
	transition: all 0.2s;
	display: flex;
	position: relative;
	overflow: hidden;
	cursor: pointer;
`;

const Logo = styled.img`
	width: 8.333vw;
`;

interface NavbarProps {
	signOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ signOut }) => {
	return (
		<Container>
			<Logo src={LogoSrc} alt="Logo" />
			<SignOutButton onClick={signOut}>Sign out</SignOutButton>
		</Container>
	);
};

export default Navbar;
