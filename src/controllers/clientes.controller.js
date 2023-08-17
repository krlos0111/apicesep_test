import { pool } from "../db.js"


export const getclientesasignados = async (req, res) => {
    try {
        const [data] = await pool.query('SELECT tbl_asignarcliente.asc_id, tbl_asignarcliente.sic_id,tbl_clientes.cli_nombre,tbl_clientes.cli_numcontacto,tbl_clientes.cli_ciudad ,tbl_sitioscliente.sic_nombre,tbl_clientes.cli_direccion ,tbl_sitioscliente.sic_horaingreso, tbl_sitioscliente.sic_horasalida,tbl_sitioscliente.sic_diainicio,tbl_sitioscliente.sic_diafin,tbl_asignarcliente.dp_id, tbl_asignarcliente.asc_estado FROM tbl_asignarcliente INNER JOIN tbl_sitioscliente ON tbl_asignarcliente.sic_id = tbl_sitioscliente.sic_id INNER JOIN tbl_clientes ON tbl_sitioscliente.cli_id = tbl_clientes.cli_id WHERE  tbl_asignarcliente.asc_estado=1 AND tbl_asignarcliente.dp_id=?',[req.params.id])
        
        res.json(data)

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




    //const checkpass=await compare('ca1234',)
    //res.send('obteniendo usuario')
}