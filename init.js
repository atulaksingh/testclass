// const mongoose = require('mongoose');
// const chat = require('./models/chat');

// const allChats = [
//   {
//     from: "atul_singh",
//     to: "dev_guru",
//     msg: "Aaj maine ReactJS me ek naya component banaya, kaafi mazedaar tha!",
//   },
//   {
//     from: "dev_guru",
//     to: "code_master",
//     msg: "Python me file handling kaafi easy hai jab aap try-except ka use karte ho.",
//   },
//   {
//     from: "code_master",
//     to: "tech_lover",
//     msg: "Mujhe dark theme wale IDEs kaafi pasand hain. Tumhara favourite IDE kaunsa hai?",
//   },
//   {
//     from: "tech_lover",
//     to: "frontend_queen",
//     msg: "Aaj ke din maine Git ke branches ko properly samjha. Finally!",
//   },
//   {
//     from: "frontend_queen",
//     to: "atul_singh",
//     msg: "TailwindCSS ke saath responsive design banana kaafi smooth ho gaya hai.",
//   }
// ];

// async function main() {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/whatsapp');
//     console.log("Connected to MongoDB successfully");

//     await chat.insertMany(allChats);
//     console.log("Chats inserted successfully");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("Error:", err);
//   }
// }

// main();
