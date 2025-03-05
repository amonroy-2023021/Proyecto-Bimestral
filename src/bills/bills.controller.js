import Cart from "../shopcart/cart.model.js";
import Product from "../products/products.model.js";
import User from "../users/user.model.js";
import Bill from "../bills/bills.model.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const completePurchase = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }

        const cart = await Cart.findOne({ user: user._id }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "El carrito está vacío"
            });
        }

        let totalAmount = 0;
        const items = cart.items.map(item => {
            if (!item.product.category) {
                throw new Error(`El producto ${item.product.name} no tiene una categoría asignada.`);
            }
            totalAmount += item.product.price * item.quantityProducts;
            return {
                product: item.product._id,
                quantity: item.quantityProducts,
                price: item.product.price,
                total: item.product.price * item.quantityProducts
            };
        });

        const bill = new Bill({
            user: user._id,
            items,
            totalAmount,
            date: new Date()
        });

        await bill.save();

        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            if (product) {
                product.stock -= item.quantityProducts;
                await product.save();
            }
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({
            success: true,
            msg: "Compra completada con éxito",
            billId: bill._id
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al completar la compra",
            error: err.message
        });
    }
};

export const generateBillPDF = async (req, res) => {
    try {
        const { billId } = req.params;

        const bill = await Bill.findById(billId).populate("user items.product");
        if (!bill) {
            return res.status(404).json({
                success: false,
                msg: "Factura no encontrada"
            });
        }

        const billsDir = path.join(__dirname, '../../bills');
        if (!fs.existsSync(billsDir)) {
            fs.mkdirSync(billsDir);
        }

        const doc = new PDFDocument();
        const billPath = path.join(billsDir, `bill_${bill._id}.pdf`);
        doc.pipe(fs.createWriteStream(billPath));

        doc.fontSize(25).text('Factura', { align: 'center' });
        doc.text(`Fecha: ${bill.date.toLocaleDateString()}`, { align: 'right' });
        doc.text(`Usuario: ${bill.user.username}`, { align: 'right' });
        doc.moveDown();

        doc.fontSize(18).text('Detalles de la compra:');
        bill.items.forEach(item => {
            doc.moveDown();
            doc.text(`Producto: ${item.product.name}`);
            doc.text(`Cantidad: ${item.quantity}`);
            doc.text(`Precio unitario: $${item.price}`);
            doc.text(`Total: $${item.total}`);
            doc.moveDown();
        });

        doc.fontSize(18).text(`Monto Total: $${bill.totalAmount}`, { align: 'right' });

        doc.end();

        res.status(200).json({
            success: true,
            msg: "Factura generada con éxito",
            billPath
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al generar la factura",
            error: err.message
        });
    }
};
