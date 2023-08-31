import { Request, Response } from "express";
import pool from "../../database/db";
import query from "../../database/query";
import { existsSync } from "fs";

export const getAllFiles = (req: Request, res: Response) => {
  pool.query(query.getAllFiles, (error, result) => {
    if (error) throw error;
    if (result.rows.length > 0) {
      console.log(result.rows);
      // res.send(result.rows);
      res.render('home')
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
      console.log(result.rows);
      res.send(result.rows);
      // return res.render('home')
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