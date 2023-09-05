import { Request, Response } from "express";
import pool from "../../database/db";
import query from "../../database/query";
import { existsSync } from "fs";
import { download } from "../../middleware/downloadCount";

export const getAllFiles = (req: Request, res: Response) => {
  pool.query(query.getAllFiles, (error, result) => {
    if (error) throw error;
    if (result.rows.length > 0) {

      const data = result.rows
      const isAuthenticated = req.isAuthenticated()
      const excludeNavbar = false

      // res.send(result.rows);
      res.render('home', {data, name: req.user, isAuthenticated, excludeNavbar})
    } 
    else {
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
      const isAuthenticated = req.isAuthenticated()
      const excludeNavbar = false
      return res.render('detail', {data,name: req.user, isAuthenticated, excludeNavbar})
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
      const filePath =
        "./public" + "/uploads/" + "kevin-ku-w7ZyuGYNpRQ-unsplash.jpg";
      if (existsSync(filePath)) {
        res.download(filePath, fileName);
        download(id)
      } else {
        res.send("No file found");
      }
    } 
  });
};


export const searchFiles = (req: Request, res:Response) => {
  const {term} = req.query
  pool.query(query.searchFiles, [`%${term}%`], (error, result)=>{
    if(error) throw error
    if(result.rows.length > 0){
      const searchResults = result.rows
      res.send(searchResults)
    } 
    else{ 
      res.status(404).json({message: "No file to match search"})
    }
  })
}