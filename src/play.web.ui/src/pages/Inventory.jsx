import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

const CatalogApiUrl = import.meta.env.VITE_CATALOG_ITEMS_API_URL;
const InventoryApiUrl = import.meta.env.VITE_INVENTORY_ITEMS_API_URL;

function Inventory() {
    const [userId, setUserId] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchInventory = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${InventoryApiUrl}/${userId}`
            );
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <h1>Inventory</h1>
            <br />
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <TextField
                    fullWidth
                    label="User ID (GUID)"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFetchInventory}
                    disabled={!userId || loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Get Inventory"}
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Description</TableCell>
                            <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <TableRow key={item.catalogItemId}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    {loading ? "Loading..." : "No data"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Inventory