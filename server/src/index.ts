import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";

dotenv.config();

const app: Express = express();

const PORT: number = Number(process.env.PORT) || 5001;

// MIDDLEWARES //
// parses incoming JSON requests & puts the parsed data in req.body
app.use(express.json());
// adds various security-related HTTP headers to the responses
app.use(helmet());
// configures helmet to accept cross-origin requests by setting the Cross-Origin-Resource-Policy header to cross-origin
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// logs HTTP requests to the console in the common format
app.use(morgan("common"));
// parses incoming JSON requests and puts the parsed data in req.body
app.use(bodyParser.json());
// parses incoming URL-encoded form data and puts the parsed data in req.body (extended: false indicates that the querystring library is used to parse the URL-encoded data)
app.use(bodyParser.urlencoded({ extended: false }));
// enables Cross-Origin Resource Sharing (CORS) for all routes, allowing the server to accept requests from different origins
app.use(cors());

// ROUTES //
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

// MAIN //
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on PORT ${PORT}...`);
});
