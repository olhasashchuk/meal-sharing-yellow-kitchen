import Container from "@mui/material/Container";
import ReservationForm from "./ReservationForm";
import { ModalProvider } from "../../../components/contexts/ModalContext";

export const Reservations = () => {
  return (
    <ModalProvider>
      <main>
      <Container style={{ marginTop: "6rem" }}>
        <ReservationForm /> 
      </Container>
    </main>
    </ModalProvider>
    
  );
};

export default Reservations;