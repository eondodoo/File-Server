import { Request, Response } from "express";
import pool from "../../database/db";
import query from "../../database/query";
import { existsSync } from "fs";
import { download } from "../../utils/downloadCount";
import { sendMail } from "../../utils/sendMail";

export const getAllFiles = (req: Request, res: Response) => {
  pool.query(query.getAllFiles, (error, result) => {
    if (error) throw error;
    if (result.rows.length > 0) {
      const data = result.rows;
      const isAuthenticated = req.isAuthenticated();
      const excludeNavbar = false;

      // res.send(result.rows);
      res.render("home", {
        data,
        name: req.user,
        isAuthenticated,
        excludeNavbar,
      });
    } else {
      res.send("No files uploaded");
    }
  });
};

export const getFileById = (req: Request, res: Response) => {
  const id = req.params.id;
  pool.query(query.getFileById, [id], (error, result) => {
    if (error) throw error;
    if (result.rows.length > 0) {
      const data = result.rows;
      const isAuthenticated = req.isAuthenticated();
      const excludeNavbar = false;
      return res.render("detail", {
        data,
        name: req.user,
        isAuthenticated,
        excludeNavbar,
      });
    }
    // return res.status(201).json(result.rows)
  });
};

export const downloadFile = (req: Request, res: Response) => {
  const id = req.params.id;
  pool.query(query.getFileById, [id], (error, result) => {
    if (error) throw error;
    if (result.rows.length > 0) {
      const fileName = result.rows[0].imgurl;
      const filePath = "./public" + "/uploads/" + fileName;
      if (existsSync(filePath)) {
        res.download(filePath, fileName);
        download(id);
      } else {
        res.send("No file found");
      }
    }
  });
};

export const searchFiles = (req: Request, res: Response) => {
  const {search}  = req.query
  pool.query(query.search, [`%${search}%`], (error, result) => {
    if (error) throw error; 
    // res.send(result.rows)
    if (result.rows.length > 0) {
      const data = result.rows;
      const isAuthenticated = req.isAuthenticated();
      const excludeNavbar = false;
      res.render('search_result', {data, 
        name: req.user,
        isAuthenticated,
        excludeNavbar,})
    } else {
      res.status(404).json({ message: "No file to match search" }); 
    }
  });
};


 
// export const sendFile = (req: Request, res: Response) => {
  
//   const id = req.params.id;
//   const authUser = req.user as User;
//   pool.query(query.getFileById, [id], (error, result) => { 
//     if (error) throw error;
//     if (result.rows.length > 0) {
//       const fileName = result.rows[0].imgurl;
//       const filePath = "./public" + "/uploads/" + fileName;
//       if (existsSync(filePath)) {
//         sendMail(fileName, authUser.email);
//       } else {
//         res.send("No file found");
//       }
//     }
//   });
// };


export const send = (req: Request, res: Response) => {
  const excludeNavbar = false
  const isAuthenticated = req.isAuthenticated()
  res.render('send_email', {excludeNavbar, name: req.user, isAuthenticated})
}

export const sendFile = (req: Request, res: Response) => {
  const {emails} = req.body
  const emailList = emails.split(',')

  const id = req.params.id;
  pool.query(query.getFileById, [id], (error, result) => { 
    if (error) throw error;
    if (result.rows.length > 0) {
      const fileName = result.rows[0].imgurl;
      const filePath = "./public" + "/uploads/" + fileName;
      if (existsSync(filePath)) {
        sendMail(fileName, emailList);
        res.redirect('/items')
      } else {
        res.send("No file found");
      }
    }
  });
};