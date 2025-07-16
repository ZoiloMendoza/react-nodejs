import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { IOrder } from "../App";

const Voucher = ({ orders }: { orders: IOrder[] }) => {
    return (
        <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 350, mx: "auto", mt: 4 }}
            autoComplete="off"
        >
            {orders.map((order, index) => (
                <Typography key={index} variant="body1">
                    {`Cliente: ${order.customer_name}, Café: ${order.favorite_coffee}, Tamaño: ${order.size}, Leche: ${order.milk_type}, Pago: ${order.payment_method}, Calificación: ${order.rating}`}
                </Typography>
            ))}
        </Box>
    );
};

export default Voucher;
