import bcrypt from "bcryptjs";
const users = [
    {
        name: "Admin user",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345",10),
        isAdmin: true,

    },

    {
         name: "farseena",
        email: "farseena@gmail.com",
        password : bcrypt.hashSync("12345",10),
        isAdmin: false,

    },
    {
     name: "laiq",
        email: "laiq@gmail.com",
        password: bcrypt.hashSync("12345",10),
        isAdmin: false,
    },

];
export default users;