import ClienteTable from "@/components/ClienteTable";
import { Inter } from "next/font/google";
import { Layout } from "../components/layouts";
import Link from "next/link";
import { Button } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout>
        <ClienteTable />
        <Link href="/cliente/AgregarCliente">
          <Button variant="contained" color="primary">
            Agregar Cliente
          </Button>
        </Link>
      </Layout>
    </>
  );
}
