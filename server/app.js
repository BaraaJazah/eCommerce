// 
const express = require("express")
const cors = require("cors");
const { default: errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

const bodyparser = require("body-parser");

// handle JSON request
app.use(express.json());
// handle Form request
app.use(bodyparser.urlencoded({ extended: true }));

// .env 
const dotenv = require("dotenv");
dotenv.config();


// connect to db
const connectDb = require("./config/DB")
connectDb()


// router
const AuthRouter = require("./router/AuthRouter")
const CaragoryRouter = require("./router/CaragoryRouter")
const SubCaragoryRouter = require("./router/SubCatagory")

const ProductRouter = require("./router/ProductRouter")
const AddressRouter = require("./router/AddressRouter")
const BankCardRouter = require("./router/BankCardRouter")
const ReviewRouter = require("./router/ReviewRouter")
const CartRouter = require("./router/CartRouter")
const WislistRouter = require("./router/WishListRouter");
const OrderRouter = require("./router/OrderRouter");


app.use("/api/auth", AuthRouter);
app.use("/api/catagory", CaragoryRouter);
app.use("/api/product", ProductRouter);
app.use("/api/address", AddressRouter);
app.use("/api/bankCard", BankCardRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/cart", CartRouter);
app.use("/api/wishlist", WislistRouter);
app.use("/api/subCaragory", SubCaragoryRouter);
app.use("/api/order", OrderRouter);

app.use(errorHandler)


// open server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is opening in port:${8000} `))




