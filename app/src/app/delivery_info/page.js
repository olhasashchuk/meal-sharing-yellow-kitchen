"use client";
import { Container } from "@mui/material";
import { TitlePage } from "../../../components/ui/TitlePage";
import { DeliveryInfo } from "./DeliveryInfo";

const Delivery_info = () => {
  return (
    <main>
      <Container style={{ marginTop: "6rem" }}>
        <TitlePage title="Delivery info"/>
        <DeliveryInfo /> 
      </Container>
    </main>
  );
};

export default Delivery_info;