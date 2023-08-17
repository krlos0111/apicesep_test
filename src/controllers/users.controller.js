import { pool } from "../db.js"
import bcrypt from 'bcryptjs';


export const getUsuarios = async (req, res) => {
    try {
        const [data] = await pool.query('SELECT *FROM tbl_usuario where usu_estado=1')
        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

export const verificarUsuarioLogin = async (req, res) => {
    try {
        const { usu_usuario, usu_password } = req.body
        const [data] = await pool.query('SELECT tbl_datospersonales.dp_id,tbl_datospersonales.dp_nombre,tbl_datospersonales.dp_apellido,tbl_usuario.usu_id,tbl_usuario.usu_usuario,tbl_usuario.usu_password,tbl_usuario.usu_estactividad,tbl_roles.rol_nombre,tbl_roles.rol_id FROM tbl_datospersonales INNER JOIN tbl_usuario ON tbl_datospersonales.usu_id = tbl_usuario.usu_id INNER JOIN tbl_roles ON tbl_datospersonales.rol_id = tbl_roles.rol_id WHERE tbl_datospersonales.dp_estado = 1 AND tbl_usuario.usu_usuario =? ', [usu_usuario]);
        const datos=[];
        const datosvac=[];
        for (let index = 0; index < data.length; index++) {
            const x = data[index];
            datos.push(x);
        }
        if (datos.length!=0) {
            //el usuario existe
            if (bcrypt.compareSync(usu_password,datos[0]['usu_password'])) {
                res.json(datos);
            }else{
                res.json(datosvac) 
            }
        }else{
            res.json(datosvac)
        }
    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }
}

export const getUsuario = async (req, res) => {
    try {
        const [data] = await pool.query('SELECT * FROM tbl_usuario where usu_usuario = ?', [req.params.id])
        if (data.length <= 0) {
            return res.status(404).json({
                message: "Error"
            })
        }
        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }
}

export const crearUsuarios = (req, res) => {
    console.log(req.body)
    res.send('Post success')
}
export const actualizarUsuarios = (req, res) => res.send('actualizando usuario')
export const deleteUsuarios = (req, res) => res.send('eliminando usuario')