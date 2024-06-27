import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";

const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/user", userRoutes);

// function isIsomorphic(s: string, t: string): boolean {
//   // check for corner case when two string are not equals by length
//   if (s.length !== t.length) return false;
//   // create map for s string mapping
//   const smap = new Map<string, string>();
//   // create map for t string mapping
//   const tmap = new Map<string, string>();
//   // iterate over strings:
//   for (let i = 0; i < s.length; i++) {
//     // take char from string s
//     const schar = s[i];
//     // take char from string t
//     const tchar = t[i];
//     // check that we have mapping in smap and it is valid with current tchar
//     if (smap.has(schar) && smap.get(schar) !== tchar) {
//       // if no return false
//       return false;
//     }
//     // check that we have mapping in tmap and it is valid with current schar
//     if (tmap.has(tchar) && tmap.get(tchar) !== schar) {
//       // if no return false
//       return false;
//     }
//     // create mapping for schar
//     smap.set(schar, tchar);
//     // create mapping for tchar
//     tmap.set(tchar, schar);
//   }
//   // return true if all mappings are valid
//   return true;
// }
// console.log("isIsomorphic ", isIsomorphic("aae", "xxa"));

app.listen(port, () => {
  console.log("server is running!");
});
