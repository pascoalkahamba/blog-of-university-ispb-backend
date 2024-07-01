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

// function isIsomorphic(s: string, t: string): boolean {
//   const mapLettersS = new Map<string, string>();
//   const mapLettersT = new Map<string, string>();

//   for (let i = 0; i < s.length; i++) {
//     const currLetterS = s[i];
//     const currLetterT = t[i];

//     if (
//       mapLettersS.has(currLetterS) &&
//       mapLettersS.get(currLetterS) !== currLetterT
//     ) {
//       return false;
//     }

//     if (
//       mapLettersT.has(currLetterT) &&
//       mapLettersT.get(currLetterT) !== currLetterS
//     ) {
//       return false;
//     }

//     mapLettersS.set(currLetterS, currLetterT);
//     mapLettersT.set(currLetterT, currLetterS);
//   }

//   return true;
// }
// console.log("isIsomorphic ", isIsomorphic("acc", "eec"));

app.listen(port, () => {
  console.log("server is running!");
});
