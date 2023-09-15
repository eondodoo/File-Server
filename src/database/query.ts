const getAllFiles = 'SELECT * FROM items';
const getFileById = 'SELECT * FROM items WHERE id = $1';

const search = "SELECT * FROM items WHERE name ILIKE $1";
const downloadCount = 'UPDATE items SET downloads = downloads + 1 WHERE id=$1'

const addFile = 'INSERT INTO items (name, description, category, imgurl, downloads) VALUES($1,$2,$3,$4,$5) RETURNING *';
const updateFile = 'UPDATE items SET name = $1, description = $2, category = $3, imgurl = $4 WHERE id = $5 ';
const deleteFile = 'DELETE items WHERE id= $1'; 

const checkEmail = 'SELECT * FROM users WHERE email= $1';
const checkUsername = 'SELECT * FROM users WHERE username = $1';
const addUser = 'INSERT INTO users (username, email, password, role) VALUES($1,$2,$3,$4) RETURNING *';
const getUserByID = 'SELECT * FROM users WHERE id = $1'

 

export default {
    getAllFiles,
    getFileById,
    checkEmail,
    checkUsername,
    addUser,
    addFile,
    updateFile,
    deleteFile,
    search,
    downloadCount,
    getUserByID
}
