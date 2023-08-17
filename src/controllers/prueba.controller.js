import { pool } from "../db.js"


export const probarfecha = async (req, res) => {
    try {
        const { bit_id,be_fecha,be_turno,usu_id } = req.body
        let now = new Date()

        //const [data]=await pool.query('INSERT INTO tbl_probar(fecha,fechanode) VALUES (?,?) ', [fecha,now])
        const [datainsert] = await pool.query('INSERT INTO tbl_bitacoraencab (bit_id, be_fecha, be_turno, usu_id, be_estado) VALUES (?,?,?,?,?)', [bit_id,be_fecha,be_turno,usu_id,1])
        res.json(datainsert['insertId']);

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }
}
