import { pool } from "../db.js"

export const crearBitacoraEnca = async (req, res) => {
    try {
        const { bitid, befecha, beturno, usuid } = req.body

        const [data] = await pool.query('INSERT INTO tbl_bitacoraencab (bit_id, be_fecha, be_turno, usu_id, be_estado) VALUES (?,?,?,?,?)', [bitid, befecha, beturno, usuid, 1])

        res.json(data['insertId']);

    }catch (error) {
        return res.status(500).json({
            message: 'algo salio mal bitacora encabezado'
        })
    }
} 

export const crearBitacoraCuerpo = async (req, res) => {
    try {
        const { bc_fechahora, tin_id, bc_descripcion, usu_id, be_id, bit_id } = req.body

        const [data] = await pool.query('INSERT INTO tbl_bitacoracuerpo (bc_fechahora, tin_id, bc_descripcion, usu_id, be_id, bit_id, bc_estado) VALUES (?,?,?,?,?,?,?)', [bc_fechahora, tin_id, bc_descripcion, usu_id, be_id, bit_id, 1])

        res.json(data['insertId']);

    }catch (error) {
        return res.status(500).json({
            message: 'algo salio mal bitacora cuerpo insert'
        })
    }
}

export const getBitacoracuerpo = async (req, res) => {
    try {
        const { bit_id,fechahin,fechahfin} = req.body
        const [data] = await pool.query('SELECT tbl_bitacoracuerpo.bc_fechahora, tbl_bitacoracuerpo.tin_id, tbl_bitacoracuerpo.bc_descripcion, tbl_bitacoracuerpo.usu_id, tbl_bitacoracuerpo.be_id, tbl_bitacoracuerpo.bit_id, tbl_incidentes.tin_nombre, tbl_usuario.usu_usuario FROM tbl_bitacoracuerpo INNER JOIN tbl_incidentes ON tbl_bitacoracuerpo.tin_id = tbl_incidentes.tin_id INNER JOIN tbl_usuario ON tbl_bitacoracuerpo.usu_id = tbl_usuario.usu_id WHERE tbl_bitacoracuerpo.bc_estado = 1 AND tbl_bitacoracuerpo.bit_id = ? AND tbl_bitacoracuerpo.bc_fechahora BETWEEN ? AND ? ;',[bit_id,fechahin,fechahfin])

        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

//SELECT tbl_bitacoracuerpo.bc_id, tbl_bitacoracuerpo.bc_fechahora, tbl_bitacoracuerpo.tin_id, tbl_bitacoracuerpo.bc_descripcion, tbl_bitacoracuerpo.usu_id, tbl_bitacoracuerpo.be_id, tbl_bitacoracuerpo.bit_id, tbl_bitacoracuerpo.bc_estado FROM tbl_bitacoracuerpo WHERE tbl_bitacoracuerpo.bit_id = 1 AND tbl_bitacoracuerpo.bc_fechahora BETWEEN '2023-08-14 00:00:00' AND '2023-08-14 23:59:00';

//SELECT tbl_bitacoracuerpo.bc_id, tbl_bitacoracuerpo.bc_fechahora, tbl_bitacoracuerpo.tin_id, tbl_bitacoracuerpo.bc_descripcion, tbl_bitacoracuerpo.usu_id, tbl_bitacoracuerpo.be_id, tbl_bitacoracuerpo.bit_id, bc_estado FROM tbl_bitacoracuerpo WHERE tbl_bitacoracuerpo.bc_fechahora BETWEEN '2023-08-14 00:00:00' AND '2023-08-14 23:59:00';