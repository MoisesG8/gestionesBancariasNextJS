// pages/agregarCliente.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  TextField,
  Typography,
  Snackbar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { gestionesApi } from "../api/index";

const AgregarCuenta: React.FC = () => {
  const router = useRouter();
  const clienteID = router.query.idCliente;
  const [tipoCuenta, setTipoCuenta] = useState("1");
  const initialFormValues = {
    idCliente: clienteID,
    idTipoCuenta: Number.parseInt(tipoCuenta),
    estado: "Activa",
    monto: 0,
    cantidadCheques: 0,
    estadoChequera: "Activa",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setTipoCuenta(event.target.value + "");
  };

  async function handleSubmit() {
    console.log(formValues);
    try {
      const response = await fetch(gestionesApi + "agregarCuenta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (result.exito) {
        setSnackbarMessage("La cuenta ha sido creada con éxito");
      } else {
        setSnackbarMessage("Ocurrió un problema al registrar la cuenta");
      }

      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setSnackbarMessage("Ocurrió un error al procesar la solicitud.");
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Agregar Cuenta
      </Typography>
      <form>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tipoCuenta}
          label="Tipo de Cuenta"
          onChange={handleChange}
        >
          <MenuItem value={1}>Ahorro</MenuItem>
          <MenuItem value={2}>Monetaria</MenuItem>
        </Select>
        <TextField
          label="Monto de apertura de la cuenta"
          variant="outlined"
          name="monto"
          type="number"
          value={formValues.monto}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cantidad de cheques"
          variant="outlined"
          name="cantidadCheques"
          disabled={tipoCuenta === "1"}
          value={formValues.cantidadCheques}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Agregar Cuenta
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default AgregarCuenta;
