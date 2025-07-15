import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ContactForm from "./components/ContactForm.tsx";

const App = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Grid size={8}>
                    <h1>Orden</h1>
                    <ContactForm />
                </Grid>
                <Grid size={8}>
                    <h1>Recibo 2</h1>
                    // <ContactForm />
                </Grid>
            </Grid>
        </Box>
    );
};

export default App;
