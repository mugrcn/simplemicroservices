import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Input,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
    userId: Yup.string()
        .uuid("UserId must be in UUID format")
        .required("UserId is required"),
    catalogItemId: Yup.string()
        .uuid("ItemId must be in UUID format")
        .required("ItemId is required"),
    quantity: Yup.number()
        .required("Quantity is required")
        .positive("Quantity must be positive"),
});

function GrantItemDialog({ open, onClose, onSave, initialValues }) {
    const formik = useFormik({
        initialValues: initialValues || { userId: null, itemId: null, itemName: "", quantity: 0 },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSave(values);
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{"Grant " + formik.values.itemName}</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <input
                        type="hidden"
                        name="catalogItemId"
                        value={formik.values.catalogItemId}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="userId"
                        label="UserId"
                        value={formik.values.userId}
                        onChange={formik.handleChange}
                        error={formik.touched.userId && Boolean(formik.errors.userId)}
                        helperText={formik.touched.userId && formik.errors.userId}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="quantity"
                        label="Quantity"
                        type="number"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                        helperText={formik.touched.quantity && formik.errors.quantity}
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

export default GrantItemDialog