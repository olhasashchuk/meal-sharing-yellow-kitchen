"use client";
import { Container } from "@mui/material";
import { TitlePage } from "../../../components/ui/TitlePage";
import { AboutUs } from "./AboutUs";

const About_us = () => {
  return (
    <main>
      <Container style={{ marginTop: "6rem" }}>
        <TitlePage title="About us"/>
        <AboutUs /> 
      </Container>
    </main>
  );
};

export default About_us;