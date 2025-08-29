import React, { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(255, "Name must be max 255 characters long"),
    description: Yup.string()
        .required("Description is required")
        .max(8000, "Name must be max 255 characters long"),
    price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
});

function ItemFormDialog({ open, onClose, onSave, initialValues }) {

    useEffect(() => {
        formik.resetForm({ values: initialValues || { id: null, name: "", description: "", price: "" } });
    }, [initialValues]);

    const formik = useFormik({
        initialValues: initialValues || { id: null, name: "", description: "", price: "" },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave(values);
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{formik.values.id ? "Edit Item" : "Add Item"}</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ItemFormDialog