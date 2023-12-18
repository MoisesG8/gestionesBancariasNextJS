// ClienteTable.tsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Cliente from "../interface/Cliente";
import Link from "next/link";

const ClienteTable: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Aquí realizar la llamada a la API para obtener la lista de clientes
    // Puedes usar fetch, axios u otra librería de tu elección
    // Ejemplo ficticio:
    fetch("http://localhost:9000/api/gestiones/clientes")
      .then((response) => response.json())
      .then((data) => setClientes(data));
  }, [handleSubmitBaja]);

  const handleEdit = (clienteID: number) => {
    // Lógica para editar el cliente con el ID proporcionado
    console.log(`Editar cliente con ID: ${clienteID}`);
  };

  async function handleSubmitBaja(clienteID: number) {
    try {
      const response = await fetch(
        "http://localhost:9000/api/gestiones/bajaCliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idCliente: clienteID }),
        }
      );

      const result = await response.json();

      if (result.exito) {
        setSnackbarMessage("Se dio de baja al cliente");
      } else {
        setSnackbarMessage("Ocurrió un problema al dar de baja al cliente.");
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.clienteID}>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.apellido}</TableCell>
              <TableCell>{cliente.telefono}</TableCell>
              <TableCell>{cliente.direccion}</TableCell>
              <TableCell>{cliente.correoElectronico}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(cliente.clienteID)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleSubmitBaja(cliente.clienteID)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>

                <Link
                  href={`/cliente/AgregarCuenta?idCliente=${cliente.clienteID}`}
                >
                  <IconButton color="success">
                    <AddCircleIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </TableContainer>
  );
};

export default ClienteTable;
