import express from "express";
import cors from "cors";
import "./config/dbConfig";
import { userRoutes } from "./routes/userRoutes";
import bodyParser from "body-parser";

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());
app.use("/post", userRoutes);
app.use(bodyParser.json());

// function containsNearbyDuplicate(nums: number[], k: number): boolean {
//   const hashNums: { [key: number]: number } = {};

//   for (let i = 0; i < nums.length; i++) {
//     const currNum = nums[i];
//     const diff = i - hashNums[currNum];

//     if (currNum in hashNums && diff <= k) {
//       return true;
//     }

//     hashNums[currNum] = i;
//   }

//   return false;
// }
// console.log(
//   "containsNearbyDuplicate ",
//   containsNearbyDuplicate([1, 11, 2, 3, 2, 10, 111], 1)
// );

app.listen(port, () => {
  console.log("server is running!");
});
