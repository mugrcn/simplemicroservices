import React, { useState, useEffect } from "react";
import {
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    CircularProgress,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import ItemFormDialog from "../components/ItemFormDialog";
import axios from 'axios'
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import GrantItemDialog from "../components/GrantItemDialog";

const CatalogApiUrl = import.meta.env.VITE_CATALOG_ITEMS_API_URL;
const InventoryApiUrl = import.meta.env.VITE_INVENTORY_ITEMS_API_URL;

function Catalog() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openItemFormDialog, setOpenItemFormDialog] = useState(false);
    const [openGrantItemFormDialog, setOpenGrantItemFormDialog] = useState(false);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [grantItem, setGrantItem] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${CatalogApiUrl}`);
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleEdit = (item) => {
        setCurrentItem(item);
        setOpenItemFormDialog(true);
    };

    const handleAdd = () => {
        setCurrentItem({ id: null, name: "", description: "", price: "" });
        setOpenItemFormDialog(true);
    };

    const handleDelete = (item) => {
        setCurrentItem(item);
        setOpenDeleteConfirmationDialog(true);
    }

    const handleClose = () => {
        setOpenItemFormDialog(false);
        setCurrentItem(null);
    };

    const handleGrantItem = (item) => {
        setGrantItem({
            userId: crypto.randomUUID(),
            catalogItemId: item.id,
            itemName: item.name,
            quantity: 1
        })
        setOpenGrantItemFormDialog(true);
    }

    const handleGrantItemClose = () => {
        setOpenGrantItemFormDialog(false);
        setGrantItem(null);
    }

    const handleGrantItemSave = async (values) => {
        try {
            await axios.post(`${InventoryApiUrl}`, values);
        } catch (error) {
            console.error("Error granting item:", error);
        } finally {
            handleGrantItemClose();
        }
    }

    const handleConfirmDelete = async () => {
        try {
            if (currentItem) {
                await axios.delete(`${CatalogApiUrl}/${currentItem.id}`);
                setItems(items.filter((item) => item.id !== currentItem.id));
            }
        }
        catch (error) {
            console.error("Error deleting item:", error);
        }
        finally {
            setOpenDeleteConfirmationDialog(false);
            setCurrentItem(null);
        }
    }

    const handleSave = async (values) => {
        try {
            if (values.id) {
                await axios.put(`${CatalogApiUrl}/${values.id}`, values);
                setItems((prev) =>
                    prev.map((i) => (i.id === values.id ? values : i))
                );
            } else {
                const response = await axios.post(`${CatalogApiUrl}`, values);
                setItems((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.error("Error saving item:", error);
        } finally {
            handleClose();
        }
    };

    if (loading) {
        return (
            <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    const HeaderCell = styled(TableCell)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        fontWeight: 'bold',
    }));

    return (
        <Container sx={{ mt: 4 }}>
            <h1>Catalog Items</h1>
            <br />
            <Table>
                <TableHead>
                    <TableRow>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Price</HeaderCell>
                        <HeaderCell>Actions</HeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    sx={{ mr: 1 }}
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </Button>
                                <Button variant="outlined" sx={{ mr: 1 }}
                                    onClick={() => handleGrantItem(item)}>
                                    Grant
                                </Button>
                                <Button color="error" variant="contained"
                                    onClick={() => handleDelete(item)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdd}>
                Add
            </Button>

            {/* Modal form */}
            <ItemFormDialog
                open={openItemFormDialog}
                onClose={handleClose}
                onSave={handleSave}
                initialValues={currentItem}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={openDeleteConfirmationDialog}
                onClose={() => setOpenDeleteConfirmationDialog(false)}
                onConfirm={handleConfirmDelete}
                itemName={currentItem?.name}
                onExited={() => setCurrentItem(null)}
            />

            {/* Grant Item Dialog */}
            <GrantItemDialog
                open={openGrantItemFormDialog}
                onClose={handleGrantItemClose}
                onSave={handleGrantItemSave}
                initialValues={grantItem}
            />
        </Container>
    );
}

export default Catalog