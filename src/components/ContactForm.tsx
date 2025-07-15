import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { type FormikProps, useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
    customerName: yup.string().required("El nombre es obligatorio"),
    favoriteCoffee: yup.string().required("El café es obligatorio"),
    size: yup.string().required("El tamaño es obligatorio"),
    milkType: yup.string().required("El tipo de leche es obligatorio"),
    paymentMethod: yup.string().required("El método de pago es obligatorio"),
    rating: yup.number().min(1, "La calificación es obligatoria").required("La calificación es obligatoria"),
});

const initialValues = {
    customerName: "",
    favoriteCoffee: "",
    size: "",
    milkType: "",
    paymentMethod: "",
    rating: 0,
};

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitData = async (data: typeof initialValues, formik: FormikProps<typeof initialValues>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:3000/api/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to submit contact");
            formik.resetForm();
            console.log(loading);
        } catch (err) {
            setError((err as Error).message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log("zoy form", values);
            submitData(values, formik);
        },
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 350, mx: "auto", mt: 4 }}
            autoComplete="off"
        >
            <TextField
                id="customerName"
                name="customerName"
                label="Nombre de Cliente"
                size="small"
                value={formik.values.customerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                helperText={formik.touched.customerName && formik.errors.customerName}
            />
            <FormControl error={formik.touched.favoriteCoffee && Boolean(formik.errors.favoriteCoffee)} size="small">
                <InputLabel id="favoriteCoffee-label">¿Cuál es tu café favorito?</InputLabel>
                <Select
                    labelId="favoriteCoffee-label"
                    id="favoriteCoffee"
                    name="favoriteCoffee"
                    value={formik.values.favoriteCoffee}
                    label="¿Cuál es tu café favorito?"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value={"espresso"}>Espresso</MenuItem>
                    <MenuItem value={"cappuccino"}>Cappuccino</MenuItem>
                    <MenuItem value={"latte"}>Latte</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {formik.touched.favoriteCoffee && formik.errors.favoriteCoffee}
                </Typography>
            </FormControl>
            <FormControl error={formik.touched.size && Boolean(formik.errors.size)} size="small">
                <InputLabel id="size-label">Tamaño</InputLabel>
                <Select
                    labelId="size-label"
                    id="size"
                    name="size"
                    value={formik.values.size}
                    label="Tamaño"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value={"alto"}>Alto</MenuItem>
                    <MenuItem value={"grande"}>Grande</MenuItem>
                    <MenuItem value={"venti"}>Venti</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {formik.touched.size && formik.errors.size}
                </Typography>
            </FormControl>
            <FormControl error={formik.touched.milkType && Boolean(formik.errors.milkType)} size="small">
                <InputLabel id="milkType-label">Tipo de Leche</InputLabel>
                <Select
                    labelId="milkType-label"
                    id="milkType"
                    name="milkType"
                    value={formik.values.milkType}
                    label="Tipo de Leche"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value={"entera"}>Entera</MenuItem>
                    <MenuItem value={"deslactosada"}>Deslactosada</MenuItem>
                    <MenuItem value={"light"}>Light</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {formik.touched.milkType && formik.errors.milkType}
                </Typography>
            </FormControl>
            <FormControl
                component="fieldset"
                error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
                sx={{ mt: 1 }}
            >
                <FormLabel component="legend">Forma de Pago</FormLabel>
                <RadioGroup
                    row
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <FormControlLabel value="tarjeta" control={<Radio />} label="Tarjeta de Crédito" />
                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                    <FormControlLabel value="transferencia" control={<Radio />} label="Transferencia Bancaria" />
                </RadioGroup>
                <Typography variant="caption" color="error">
                    {formik.touched.paymentMethod && formik.errors.paymentMethod}
                </Typography>
            </FormControl>
            <Box>
                <Typography component="legend">Calificación del Servicio</Typography>
                <Rating
                    name="rating"
                    value={formik.values.rating}
                    onChange={(_, value) => formik.setFieldValue("rating", value)}
                    onBlur={formik.handleBlur}
                />
                <Typography variant="caption" color="error">
                    {formik.touched.rating && formik.errors.rating}
                </Typography>
            </Box>
            <Button color="primary" loading={loading} variant="contained" type="submit">
                Enviar Pedido
            </Button>
        </Box>
    );
};

export default ContactForm;
