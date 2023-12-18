// pages/agregarCliente.tsx
import React, { useState } from "react";
import { Button, TextField, Typography, Snackbar } from "@mui/material";
import { gestionesApi } from "../api/index";

const AgregarCliente: React.FC = () => {
  const initialFormValues = {
    telefono: "",
    direccion: "",
    nombre: "",
    fechaNacimiento: "",
    apellido: "",
    numeroIdentificacion: "",
    correoElectronico: "",
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

  async function handleSubmit() {
    console.log(formValues);
    try {
      const response = await fetch(gestionesApi + "agregarCliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (result.exito) {
        setSnackbarMessage("El cliente ha sido agregado con éxito");
      } else {
        setSnackbarMessage("Ocurrió un problema al registrar al cliente.");
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
        Agregar Cliente
      </Typography>
      <form>
        <TextField
          label="Nombre"
          variant="outlined"
          name="nombre"
          value={formValues.nombre}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellidos"
          variant="outlined"
          name="apellido"
          value={formValues.apellido}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="DPI"
          variant="outlined"
          name="numeroIdentificacion"
          value={formValues.numeroIdentificacion}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teléfono"
          variant="outlined"
          name="telefono"
          value={formValues.telefono}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dirección"
          variant="outlined"
          name="direccion"
          type="email"
          value={formValues.direccion}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo electronico"
          variant="outlined"
          name="correoElectronico"
          value={formValues.correoElectronico}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label=""
          variant="outlined"
          name="fechaNacimiento"
          type="date"
          value={
            formValues.fechaNacimiento
              ? formValues.fechaNacimiento.toString().substring(0, 10)
              : ""
          }
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <div></div>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Agregar Cliente
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

export default AgregarCliente;
