import { pool } from "../db.js"


export const listaincidentes= async (req, res) => {
    try {
        const [data] = await pool.query('SELECT *FROM tbl_incidentes where tin_estado=1')
        
        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}