import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import path from "path";
const app: Application = express();

// midleware
app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = "http://localhost:3000"; // Production frontend
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "..", "build")));

// Set the views directory for EJS templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Set EJS as the view engine

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "HosCare server running...",
  });
});

app.use("/api/v1", router);

// Catch-all route for client-side routing
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// error handler
app.use(globalErrorHandler);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Api not found",
    error: {
      path: req.originalUrl,
      message: "Your request path is not find",
    },
  });
});

export default app;
