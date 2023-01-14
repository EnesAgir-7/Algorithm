// import * as express from 'express';
const express = require('express');
import * as mysql from 'mysql2';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

const app = express();
const port = 3033;


interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
  birthday: Date;
  password: string;
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'WebApi'
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(express.json());

app.post('/user', (req: Request, res: Response) => {
  const user = req.body as User;
  // Hash the password using bcrypt 
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;

  // Insert the user into the users table
  connection.query(
    'INSERT INTO users SET ?',
    user,
    (error, results) => {
      if (error) throw error;
      res.send('User saved successfully');
    }
  );
});

// app.get('/user/:id', (req: Request, res: Response) => {
//   // Select the user from the users table
//   connection.query(
//     'SELECT * FROM users WHERE id = ?',
//     [req.params.id],
//     (error, results) => {
//       if (error) throw error;
//       if (results.length > 0) {
//         res.json(results[0]);
//       } else {
//         res.status(404).send('User not found');
//       }
//     }
//   );
// });



// import bodyParser from "body-parser";
// import express from "express";
// import { Request, Response } from "express";
// import mysql from 'mysql';

// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json());

// app.get('/details/:id', (req: Request, res: Response) => {

//   var pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '9603',
//     database: 'enes',
//     connectionLimit: 20,
//     multipleStatements: true,
//   })

//   res.send({
//     message: "Hello World!",
//     data: req.params.id,
//     name: req.params.name,
//   });
// })

// app.post('/', (req: Request, res: Response) => {
//   res.send({
//     data: req.body,
//     name: req.params.name
//   })
// })

// app.listen(3033, () => {
//   console.log('The application is listing on port 30033!')
// });