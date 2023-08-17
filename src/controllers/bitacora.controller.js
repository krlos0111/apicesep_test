import { pool } from "../db.js"


export const getBitacoracuerpo = async (req, res) => {
    try {
        //const [data] = await pool.query('SELECT *FROM tbl_bitacoracuerpo')
        const [data] = await pool.query('SELECT tbl_bitacoracuerpo.bc_id, tbl_bitacoracuerpo.bc_fechahora, tbl_incidentes.tin_nombre, tbl_bitacoracuerpo.bc_descripcion, tbl_bitacoracuerpo.bc_estado FROM tbl_bitacoracuerpo INNER JOIN tbl_incidentes ON tbl_bitacoracuerpo.tin_id = tbl_incidentes.tin_id WHERE tbl_bitacoracuerpo.bc_estado=1')

        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

export const datosBitacoracuerpo = async (req, res) => {
    try {

        const { be_fecha, usu_id, dpid } = req.body

        const [data] = await pool.query('SELECT tbl_asignarcliente.asc_id, tbl_asignarcliente.dp_id, tbl_sitioscliente.sic_nombre, tbl_sitioscliente.bit_id, tbl_calusuarios.title, tbl_calusuarios.start FROM tbl_asignarcliente INNER JOIN tbl_sitioscliente ON tbl_asignarcliente.sic_id = tbl_sitioscliente.sic_id INNER JOIN tbl_calusuarios ON tbl_asignarcliente.asc_id=tbl_calusuarios.asc_id WHERE tbl_asignarcliente.asc_estado=1 AND tbl_asignarcliente.dp_id = ?;', [dpid])

        var fechaapp = new Date(be_fecha);
        var fechaapptrans = new Intl.DateTimeFormat('es').format(fechaapp);

        const datosObt = [];

        for (let index = 0; index < data.length; index++) {
            const x = data[index];
            var fstartlista = new Date(x['start']);
            var fstartlistatrans = new Intl.DateTimeFormat('es').format(fstartlista);

            if (fstartlistatrans === fechaapptrans) {
                datosObt.push(x)
            }
        }

        const datosObtdef = [];
        if (datosObt.length != 0) {
            //hay alguna asignacion fecha actual hoy
            const [bitencabezado] = await pool.query('SELECT tbl_bitacoraencab.be_id, tbl_bitacoraencab.bit_id, tbl_bitacoraencab.be_fecha, tbl_bitacoraencab.be_turno, tbl_bitacoraencab.usu_id, tbl_bitacoraencab.be_estado, tbl_sitioscliente.sic_nombre, tbl_clientes.cli_nombre FROM tbl_bitacoraencab INNER JOIN tbl_sitioscliente ON tbl_bitacoraencab.bit_id=tbl_sitioscliente.bit_id INNER JOIN tbl_clientes ON tbl_sitioscliente.cli_id=tbl_clientes.cli_id WHERE tbl_bitacoraencab.be_estado = 1 AND tbl_bitacoraencab.bit_id = ? AND tbl_bitacoraencab.usu_id=?;', [datosObt[0]['bit_id'], usu_id])

            for (let index = 0; index < bitencabezado.length; index++) {
                const x = bitencabezado[index];
                var fstartlista = new Date(x['be_fecha']);
                var fstartlistatrans = new Intl.DateTimeFormat('es').format(fstartlista);

                if (fstartlistatrans === fechaapptrans) {
                    datosObtdef.push(x)
                }
            }

            const [bitacuerpo] = await pool.query('SELECT tbl_bitacoracuerpo.bc_fechahora, tbl_bitacoracuerpo.tin_id, tbl_incidentes.tin_nombre, tbl_bitacoracuerpo.bc_descripcion, tbl_bitacoracuerpo.be_id FROM tbl_bitacoracuerpo INNER JOIN tbl_incidentes ON tbl_bitacoracuerpo.tin_id = tbl_incidentes.tin_id WHERE tbl_bitacoracuerpo.bc_estado = 1 AND tbl_bitacoracuerpo.be_id = ? AND tbl_bitacoracuerpo.usu_id=?', [datosObtdef[0]['be_id'], usu_id])
            res.json(bitacuerpo);
        }
        
    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

//SELECT tbl_bitacoracuerpo.bc_fechahora, tbl_bitacoracuerpo.tin_id, tbl_incidentes.tin_nombre, tbl_bitacoracuerpo.bc_descripcion, tbl_bitacoracuerpo.be_id FROM tbl_bitacoracuerpo INNER JOIN tbl_incidentes ON tbl_bitacoracuerpo.tin_id = tbl_incidentes.tin_id WHERE tbl_bitacoracuerpo.bc_estado = 1 AND tbl_bitacoracuerpo.be_id = 1;

export const getBitacora = async (req, res) => {
    try {
        const [data] = await pool.query('SELECT tbl_asignarcliente.asc_id, tbl_asignarcliente.sic_id, tbl_sitioscliente.sic_nombre, tbl_clientes.cli_id, tbl_clientes.cli_nombre, tbl_asignarcliente.dp_id, tbl_bitacora.bit_id, tbl_bitacora.bit_nombre FROM tbl_asignarcliente INNER JOIN tbl_sitioscliente ON tbl_asignarcliente.sic_id = tbl_sitioscliente.sic_id INNER JOIN tbl_clientes ON tbl_sitioscliente.cli_id = tbl_clientes.cli_id INNER JOIN tbl_bitacora ON tbl_sitioscliente.bit_id = tbl_bitacora.bit_id WHERE tbl_asignarcliente.asc_estado = 1 AND tbl_asignarcliente.dp_id = ?', [req.params.id])

        res.json(data)

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })

    }
}

export const verBitacoraEnca = async (req, res) => {
    try {
        const { be_fecha, usu_id, dpid } = req.body

        const [data] = await pool.query('SELECT tbl_asignarcliente.asc_id, tbl_asignarcliente.dp_id, tbl_sitioscliente.sic_nombre, tbl_sitioscliente.bit_id, tbl_calusuarios.title, tbl_calusuarios.start FROM tbl_asignarcliente INNER JOIN tbl_sitioscliente ON tbl_asignarcliente.sic_id = tbl_sitioscliente.sic_id INNER JOIN tbl_calusuarios ON tbl_asignarcliente.asc_id=tbl_calusuarios.asc_id WHERE tbl_asignarcliente.asc_estado=1 AND tbl_asignarcliente.dp_id = ?;', [dpid])

        var fechaapp = new Date(be_fecha);
        var fechaapptrans = new Intl.DateTimeFormat('es').format(fechaapp);

        const datosObt = [];

        for (let index = 0; index < data.length; index++) {
            const x = data[index];
            var fstartlista = new Date(x['start']);
            var fstartlistatrans = new Intl.DateTimeFormat('es').format(fstartlista);

            if (fstartlistatrans === fechaapptrans) {
                datosObt.push(x)
            }
        }

        const datosObtdef = [];
        const resultadofinal = [];

        if (datosObt.length != 0) {
            //hay alguna asignacion fecha actual hoy
            const [bitencabezado] = await pool.query('SELECT tbl_bitacoraencab.be_id, tbl_bitacoraencab.bit_id, tbl_bitacoraencab.be_fecha, tbl_bitacoraencab.be_turno, tbl_bitacoraencab.usu_id, tbl_bitacoraencab.be_estado FROM tbl_bitacoraencab WHERE tbl_bitacoraencab.be_estado=1 AND tbl_bitacoraencab.bit_id = ? AND tbl_bitacoraencab.usu_id=?;', [datosObt[0]['bit_id'], usu_id])

            for (let index = 0; index < bitencabezado.length; index++) {
                const x = bitencabezado[index];
                var fstartlista = new Date(x['be_fecha']);
                var fstartlistatrans = new Intl.DateTimeFormat('es').format(fstartlista);

                if (fstartlistatrans === fechaapptrans) {
                    datosObtdef.push(x)
                }
            }

            if (datosObtdef.length == 0) {
                //No hay datos:::crear
                for (let index = 0; index < datosObt.length; index++) {
                    const x = datosObt[index];
                    resultadofinal.push(x);
                }
            }
        }

        res.json(resultadofinal);

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }
}

export const obtenerBitEncabezadoxId = async (req, res) => {
    try {
        const [bitencabezado] = await pool.query('SELECT tbl_bitacoraencab.be_id, tbl_bitacoraencab.bit_id, tbl_bitacoraencab.be_fecha, tbl_bitacoraencab.be_turno, tbl_bitacoraencab.usu_id, tbl_bitacoraencab.be_estado FROM tbl_bitacoraencab WHERE tbl_bitacoraencab.be_estado=1 AND tbl_bitacoraencab.be_id=?',[req.params.id])

        res.json(bitencabezado);

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }
}

export const obtenerBitEncabezado = async (req, res) => {
    try {

        const { be_fecha, usu_id, dpid } = req.body

        const [data] = await pool.query('SELECT tbl_asignarcliente.asc_id, tbl_asignarcliente.dp_id, tbl_sitioscliente.sic_nombre, tbl_sitioscliente.bit_id, tbl_calusuarios.title, tbl_calusuarios.start FROM tbl_asignarcliente INNER JOIN tbl_sitioscliente ON tbl_asignarcliente.sic_id = tbl_sitioscliente.sic_id INNER JOIN tbl_calusuarios ON tbl_asignarcliente.asc_id=tbl_calusuarios.asc_id WHERE tbl_asignarcliente.asc_estado=1 AND tbl_asignarcliente.dp_id = ?;', [dpid])

        var fechaapp = new Date(be_fecha);
        var fechaapptrans = new Intl.DateTimeFormat('es').format(fechaapp);

        const datosObt = [];

        for (let index = 0; index < data.length; index++) {
            const x = data[index];
            var fstartlista = new Date(x['start']);
            var fstartlistatrans = new Intl.DateTimeFormat('es').format(fstartlista);

            if (fstartlistatrans === fechaapptrans) {
                datosObt.push(x)
            }
        }

        const datosObtdef = [];

        if (datosObt.length != 0) {
            //hay alguna asignacion fecha actual hoy
            const [bitencabezado] = await pool.query('SELECT tbl_bitacoraencab.be_id, tbl_bitacoraencab.bit_id, tbl_bitacoraencab.be_fecha, tbl_bitacoraencab.be_turno, tbl_bitacoraencab.usu_id, tbl_bitacoraencab.be_estado, tbl_sitioscliente.sic_nombre, tbl_clientes.cli_nombre FROM tbl_bitacoraencab INNER JOIN tbl_sitioscliente ON tbl_bitacoraencab.bit_id=tbl_sitioscliente.bit_id INNER JOIN tbl_clientes ON tbl_sitioscliente.cli_id=tbl_clientes.cli_id WHERE tbl_bitacoraencab.be_estado = 1 AND tbl_bitacoraencab.bit_id = ? AND tbl_bitacoraencab.usu_id=?;', [datosObt[0]['bit_id'], usu_id])

            for (let index = 0; index < bitencabezado.length; index++) {
                const x = bitencabezado[index];
                var fstartlista = new Date(x['be_fecha']);
                var fstartlistatrans = new Intl.DateTimeFormat('es').format(fstartlista);

                if (fstartlistatrans === fechaapptrans) {
                    datosObtdef.push(x)
                }
            }
        }
        res.json(datosObtdef);

    } catch (error) {
        return res.status(500).json({
            message: 'algo salio mal'
        })
    }
}