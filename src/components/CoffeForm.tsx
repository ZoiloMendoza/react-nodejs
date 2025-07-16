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
import { useEffect, useState } from "react";
import * as yup from "yup";
import type { IOrder } from "../App";

const validationSchema = yup.object({
    customer_name: yup.string().required("El nombre es obligatorio"),
    favorite_coffee: yup.string().required("El café es obligatorio"),
    size: yup.string().required("El tamaño es obligatorio"),
    milk_type: yup.string().required("El tipo de leche es obligatorio"),
    payment_method: yup.string().required("El método de pago es obligatorio"),
    rating: yup.number().min(1, "La calificación es obligatoria").required("La calificación es obligatoria"),
});

const initialValues = {
    customer_name: "",
    favorite_coffee: "",
    size: "",
    milk_type: "",
    payment_method: "",
    rating: 0,
};

const CoffeForm = ({ onAddOrder }: { onAddOrder: React.Dispatch<React.SetStateAction<IOrder[]>> }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEntries = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:3000/api/test");
            if (!res.ok) throw new Error("Failed to fetch contacts");
            const data = await res.json();
            onAddOrder(data);
        } catch (err) {
            setError("Error al obtener el pedido, por favor intente más tarde.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const submitData = async (data: typeof initialValues, formik: FormikProps<typeof initialValues>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:3000/api/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Ocurrio un error");

            formik.resetForm();
            fetchEntries();
        } catch (err) {
            setError("Error al enviar el pedido, por favor intente más tarde.");
            console.log(err);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
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
                id="customer_name"
                name="customer_name"
                label="Nombre de Cliente"
                size="small"
                value={formik.values.customer_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.customer_name && Boolean(formik.errors.customer_name)}
                helperText={formik.touched.customer_name && formik.errors.customer_name}
            />
            <FormControl error={formik.touched.favorite_coffee && Boolean(formik.errors.favorite_coffee)} size="small">
                <InputLabel id="favorite_coffee-label">¿Cuál es tu café favorito?</InputLabel>
                <Select
                    labelId="favorite_coffee-label"
                    id="favorite_coffee"
                    name="favorite_coffee"
                    value={formik.values.favorite_coffee}
                    label="¿Cuál es tu café favorito?"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value={"espresso"}>Espresso</MenuItem>
                    <MenuItem value={"cappuccino"}>Cappuccino</MenuItem>
                    <MenuItem value={"latte"}>Latte</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {formik.touched.favorite_coffee && formik.errors.favorite_coffee}
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
            <FormControl error={formik.touched.milk_type && Boolean(formik.errors.milk_type)} size="small">
                <InputLabel id="milk_type-label">Tipo de Leche</InputLabel>
                <Select
                    labelId="milk_type-label"
                    id="milk_type"
                    name="milk_type"
                    value={formik.values.milk_type}
                    label="Tipo de Leche"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <MenuItem value={"entera"}>Entera</MenuItem>
                    <MenuItem value={"deslactosada"}>Deslactosada</MenuItem>
                    <MenuItem value={"light"}>Light</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {formik.touched.milk_type && formik.errors.milk_type}
                </Typography>
            </FormControl>
            <FormControl
                component="fieldset"
                error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
                sx={{ mt: 1 }}
            >
                <FormLabel component="legend">Forma de Pago</FormLabel>
                <RadioGroup
                    row
                    id="payment_method"
                    name="payment_method"
                    value={formik.values.payment_method}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <FormControlLabel value="tarjeta" control={<Radio />} label="Tarjeta de Crédito" />
                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                    <FormControlLabel value="transferencia" control={<Radio />} label="Transferencia Bancaria" />
                </RadioGroup>
                <Typography variant="caption" color="error">
                    {formik.touched.payment_method && formik.errors.payment_method}
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

export default CoffeForm;
