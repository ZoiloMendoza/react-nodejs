import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

interface Coffee {
    id: number;
    name: string;
    size: string;
    milkType: string;
    paymentMethod: string;
    rating: number;
}

const Voucher = () => {
    const [coffee, setCoffee] = useState<Coffee>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEntries = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:3000/api/test");
            if (!res.ok) throw new Error("Failed to fetch contacts");
            const data = await res.json();
            setCoffee(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 350, mx: "auto", mt: 4 }}
            autoComplete="off"
        >
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading...</p>}
            <Typography variant="caption" color="error">
                Hola
                {coffee?.name}
            </Typography>
        </Box>
    );
};

export default Voucher;
