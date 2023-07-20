import { pool } from "../db.js"
import bcrypt from 'bcryptjs';


export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT *FROM tbl_usuario')
        res.json(rows)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }

}

export const verificarUsuarioLogin = async (req, res) => {
    try {
        const { usuario, password } = req.body
        const [data] = await pool.query('SELECT tbl_datospersonales.dp_id, tbl_datospersonales.dp_nombre, tbl_datospersonales.dp_apellido, tbl_usuario.usu_usuario, tbl_usuario.usu_password, tbl_roles.rol_nombre FROM tbl_datospersonales INNER JOIN tbl_usuario ON tbl_datospersonales.usu_id = tbl_usuario.usu_id INNER JOIN tbl_roles ON tbl_datospersonales.rol_id=tbl_roles.rol_id WHERE tbl_datospersonales.dp_estado = 1 AND tbl_usuario.usu_usuario=?', [usuario])
        bcrypt.compare(password, data[0]['usu_password'], function (err, res) {
            const ver = res
        })

        if (res) {
            res.json(data[0])
        } else {
            return res.status(404).json({
                message: "Error"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }

}

export const getUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tbl_usuario where usu_usuario = ?', [req.params.id])
        if (rows.length <= 0) {
            return res.status(404).json({
                message: "Error"
            })
        }
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }




    //const checkpass=await compare('ca1234',)
    //res.send('obteniendo usuario')
}

export const crearUsuarios = (req, res) => {
    console.log(req.body)
    res.send('Post success')
}
export const actualizarUsuarios = (req, res) => res.send('actualizando usuario')
export const deleteUsuarios = (req, res) => res.send('eliminando usuario')