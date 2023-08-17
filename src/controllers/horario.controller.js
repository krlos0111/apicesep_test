import { pool } from "../db.js"


export const horarioUsuario= async (req, res) => {
    try {
        const [data] = await pool.query('SELECT tbl_calusuarios.id, tbl_calusuarios.title, tbl_calusuarios.start, tbl_calusuarios.end, tbl_calusuarios.asc_id, tbl_sitioscliente.sic_nombre,tbl_clientes.cli_nombre FROM tbl_calusuarios INNER JOIN tbl_asignarcliente ON tbl_calusuarios.asc_id = tbl_asignarcliente.asc_id INNER JOIN tbl_sitioscliente ON tbl_asignarcliente.sic_id = tbl_sitioscliente.sic_id INNER JOIN tbl_clientes ON tbl_sitioscliente.cli_id=tbl_clientes.cli_id WHERE tbl_calusuarios.estado=1 AND tbl_calusuarios.dp_id = ?;',[req.params.id])
        
        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

export const actualizacionEstadoUs= async (req, res) => {
    try {
        const { estado,id } = req.body
        const [data] = await pool.query('UPDATE tbl_usuario SET tbl_usuario.usu_estactividad=? WHERE tbl_usuario.usu_id=?;',[estado,id])
        
        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

export const ActualAsigCalendario= async (req, res) => {
    try {
        const {colortexto,colofonfo,id } = req.body
        const [data] = await pool.query('UPDATE tbl_calusuarios SET tbl_calusuarios.backgroundColor = ? , tbl_calusuarios.textColor=? WHERE tbl_calusuarios.id = ?;',[colofonfo,colortexto,id])
        
        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

export const crearAsistencia= async (req, res) => {
    try {
        const {dp_id, usu_id, id, asc_id, asis_fechainicio, tasi_id} = req.body
        const [data] = await pool.query('INSERT INTO tbl_asistencia (dp_id, usu_id, id, asc_id, asis_fechainicio, tasi_id, asis_estado) VALUES (?,?,?,?,?,?,?)',[dp_id, usu_id, id, asc_id, asis_fechainicio,tasi_id,1])
        
        res.json(data['insertId']);

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}


export const actualizarAsistencia= async (req, res) => {
    try {
        const {fechafin,id} = req.body
        const [data] = await pool.query('UPDATE tbl_asistencia SET tbl_asistencia.asis_fechafin=? WHERE tbl_asistencia.id=?',[fechafin,id]);

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}
//color activo #F6C11D
//color cumplido #0EDC3A
//color text #000000


