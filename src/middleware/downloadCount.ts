import pool from "../database/db"
import query from "../database/query"

export const download = (id: string ) => {
    pool.query(query.downloadCount, [id], (error, result)=>{
      if(error) throw error 
    })
  }