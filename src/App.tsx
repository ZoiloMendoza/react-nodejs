import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CoffeForm from "./components/CoffeForm.tsx";
import Voucher from "./components/Voucher.tsx";

export interface IOrder {
    customer_name: string;
    favorite_coffee: string;
    size: string;
    milk_type: string;
    payment_method: string;
    rating: number;
}

const App = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Grid size={8}>
                    <h1>Orden</h1>
                    <CoffeForm onAddOrder={setOrders} />
                </Grid>
                <Grid size={8}>
                    <h1>Ordenes guardadas</h1>
                    <Voucher orders={orders} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default App;
