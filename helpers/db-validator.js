const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolvalido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol ){
        throw new Error(`EL rol ${ rol } no esta registrado en la DB`)
    }
}

const emailExiste = async( correo = '' ) =>{
    // verificra si el correo existe
    const existeEmail = await Usuario.findOne({correo });
    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya esta registrado en la DB`)
    }
}

const existeUsuarioporID = async( id ) =>{
    // verificra si el correo existe
    const existeUsuario = await Usuario.findById({correo });
    if (existeUsuario) {
        throw new Error(`El id no existe ${ id } `)
    }
}

module.exports = {
    esRolvalido,
    emailExiste,
    existeUsuarioporID
}