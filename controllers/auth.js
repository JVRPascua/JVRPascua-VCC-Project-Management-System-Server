import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 

import pool from '../db.js';

dotenv.config();

// export const signin = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await pool.query(`SELECT * FROM users WHERE username= $1;`, [username]);
//         const user = existingUser.rows;
//         if (user.length === 0) {
//             res.status(400).json({error: "User not found!",});
//         }
//         else
//         bcrypt.compare(password, user[0].password, (err, result) => {
//             if (err) {
//                 res.status(500).json({error: "Server Error!",});
//             }
//         });
//         const token = jwt.sign({ username: existingUser.username, id: existingUser.users_id }, 'test', {expiresIn: "1h"})

//         res.status(200).json({ result: existingUser, token });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong."});
//     }
// }

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
    const existingUser = await pool.query(`SELECT * FROM users WHERE username= $1;`, [username]) //Verifying if the user exists in the database
    const user = existingUser.rows;
    
    if (user.length === 0) {
    res.status(400).json({
    error: "User not found!",
    });
    }
    else {
    bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
    if (err) {
    res.status(500).json({
    error: "Server error",
    });
    } else if (result === true) { //Checking if credentials match
    
    const token = jwt.sign({username: user[0].username, id: user[0].users_id },'test', {expiresIn: "1h"} );

    res.status(200).json({
    message: "User signed in!",
    result: existingUser,
    token: token,
    });

    }
    else {
    //Declaring the errors
    if (result != true)
    res.status(400).json({
    error: "Wrong credentials!",
    });
    }
    })
    }
    } catch (err) {
    console.log(err);
    res.status(500).json({
    error: "Something went wrong!", //Database connection error
    });
    };
    };

/* export const signup  =  async (req, res) => {
    const { is_admin, role, username, password } =  req.body;
    console.log(req.body);
    try {
    const  data  =  await pool.query(`SELECT * FROM users WHERE username= $1;`, [username]);
    const  arr  =  data.rows;
    if (arr.length  !=  0) {
    return  res.status(400).json({
    error: "Email already there, No need to register again.",
    });
    }
    else {
    bcrypt.hash(password, 10, (err, hash) => {
    if (err)
    res.status(err).json({
    error: "Server error",
    });
    const  user  = {
    is_admin,
    role,
    username,
    password: hash,
    };
    var  flag  =  1; //Declaring a flag
    
    Inserting data into the database
    
    pool.query(`INSERT INTO users (is_admin, role, username, password) VALUES ($1,$2,$3,$4);`, [user.is_admin, user.role, user.username, user.password], (err) => {
    
    if (err) {
    flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
    console.error(err);
    return  res.status(500).json({
    error: "Database error"
    })
    }
    else {
    flag  =  1;
    res.status(200).send({ message: 'User added to database, not verified' });
    }
    })
    if (flag) {
    const token  = jwt.sign( //Signing a jwt token
    {
    username: user.username
    },
    process.env.ACCESS_TOKEN_SECRET
    );
    };
    });
    }
    }
    catch (err) {
    console.log(err);
    res.status(500).json({
    error: "Database error while registring user!", //Database connection error
    });
    };
    } */