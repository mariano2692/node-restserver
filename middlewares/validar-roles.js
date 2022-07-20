

export const esAdminRole =(req,res,next)=>{


    if(!req.usuario) return res.status(500).json({
        msg:'se quiere verificar el rol sin verificar el token'
    })


    const {rol , nombre } = req.usuario;

    if(rol !== 'ADMIN_ROLE') return res.status(401).json({
        msg: `${nombre} no es administrador - no puede hacer eso`
    })

    next();
}

export const tieneRoles = (...roles)=>{
 return (req,res,next)=>{

    console.log(roles, req.usuario.rol)
    if(!roles.includes(req.usuario.rol))return res.status(401).json({
        msg:`el servicio requiere uno de estos roles ${roles}`
    })

    next();

 }
}