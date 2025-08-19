import mongoose from "mongoose";
// Only import for side effects; cron job is registered on import


const connection = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log("connection successfully");
      // monthlyPayroll(); // No longer needed
    })
    .catch((error) => {
      console.log("connection failed", error);
    });
};

export default connection;
