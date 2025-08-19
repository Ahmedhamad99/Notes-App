import connection from "../DB/connection.js";
import { globalError } from "./utils/asyncHandler.js";
import authRoutes from "./module/Auth/auth.routes.js";
import noteRoutes from "./module/Note/note.routes.js";
import userRoutes from "./module/User/user.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema.graphql.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import { auth } from "./middleware/auth.js";

const initializeApp = (app, express) => {
  app.use(express.json());
  app.use(cors());
  connection();
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


  app.use("/api/auth", authRoutes);
  app.use(auth);
  app.use("/api/user",userRoutes)
  app.use(
    "/api/notes-graph",
   graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { user: req.user }, 
  }))
  );
  app.use("/api/notes-rest", noteRoutes);
  
  

  app.use(globalError);
  app.use("/{*any}", (req, res, next) => {
    res.status(404).json({
      success: false,
      message: `Can't find this route: ${req.originalUrl}`,
    });
  });
};

export default initializeApp;
