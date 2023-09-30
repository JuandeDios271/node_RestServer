const { response } = require('express');
const bcryptjs = require('bcryptjs');
//const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {

    const { limite= 5, desde = 0 } = req.query;
    const query = { estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios 
    });
}

const usuariosPost = async(req, res = response) => {

    const  {nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol });

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en DB
    await usuario.save();
    res.json({
        usuario
    });
}

const usuariosPut =  async(req, res = response ) => {

    const { id } = req.params ;
    const { _id, password, gooogle,correo, ...resto } = req.body;

    //Validar contra base de datos

    if( password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario); 
}




const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API'
    });
}
const usuariosDelete =  async(req, res = response) => {
    
    const {id} = req.params;
    
    //Fiscamente se borra
    //const usuario = await Usuario.findByIdAndDelete( id );


    //cambiar el estado
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    
    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}