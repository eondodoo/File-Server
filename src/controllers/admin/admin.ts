import { Request, Response } from "express";
import pool from "../../database/db";
import query from "../../database/query";
import { QueryResult } from "pg";
import { UploadedFile } from "express-fileupload";

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  let errors = [];
  let user;
  if (!email || !password) {
    errors.push({ message: "Enter email or password" });
  }
  if (errors.length > 0) {
    res.status(401).send(errors);
  } else {
    pool.query(query.checkEmail, [email], (error, result) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        user = result.rows[0];
        if (!user) {
          errors.push({ message: "No User found" });
        }
      }
    });
  }
};

export const getAllFiles = (req: Request, res: Response) => {
  pool.query(query.getAllFiles, (error, result) => {
    if (error) throw error;
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.send("No records found");
    }
  });
};
export const getFileById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(query.getFileById, [id], (error, result) => {
    if (error) throw error;
    if (result.rows.length > 0) {
      console.log(result.rows);
    }
    res.send(`Post detail of ${id}`);
  });
};

export const addFile = (req: Request, res: Response) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("No files were uploaded");
  }
  const { name, description, category } = req.body; 
  let uploadedFile = req.files.file as UploadedFile;
  let filePath = "./public" + "/uploads/" + uploadedFile.name;

  uploadedFile.mv(filePath, (error) => {
    if (error) return res.status(400).send(error);
    res.send("File uploaded");
  });
  pool.query(
    query.addFile,
    [name, description, category, uploadedFile.name],
    (error, result) => {
      if (error) throw error;
      if (result.rows.length > 0) {
        console.log(result.rows);
      }
    }
  );
};
export  const add = (req: Request, res: Response)=>{
  res.render('./add_post')
}

export const updateFile = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.files || !req.files.file) {
    return res.status(400).send("No files were uploaded");
  }
  const { name, description, category } = req.body;
  let uploadedFile = req.files.file as UploadedFile;
  let filePath = "./public" + "/uploads/" + uploadedFile.name;

  uploadedFile.mv(filePath, (error) => {
    if (error) return res.status(400).send(error);
    res.send("File uploaded");
  });
  pool.query(
    query.updateFile,
    [name, description, category, uploadedFile.name, id],
    (error, result) => {
      if (error) throw error;
    }
  );
};

export const deleteFile = (req: Request, res: Response) => {
  const id = req.params.id;
  pool.query(query.deleteFile, [id], (error, result) => {
    if (error) throw error;
  });
  res.redirect("dashboard");
};
