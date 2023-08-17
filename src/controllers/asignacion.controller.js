import { pool } from "../db.js"


export const verificarHorario = async (req, res) => {
    try {
        const { dpid,fechain,fechasal } = req.body

        const [data] = await pool.query('SELECT tbl_calusuarios.id, tbl_calusuarios.title, tbl_calusuarios.start, tbl_calusuarios.end, tbl_calusuarios.textColor, tbl_calusuarios.backgroundColor, tbl_calusuarios.dp_id, tbl_calusuarios.asc_id, tbl_calusuarios.estado FROM tbl_calusuarios WHERE tbl_calusuarios.estado=1 AND tbl_calusuarios.dp_id=? AND tbl_calusuarios.start BETWEEN ? AND ?;', [dpid,fechain,fechasal])

        res.json(data);

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }
}

