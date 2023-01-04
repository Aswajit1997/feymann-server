const errorHandler=(err,req,res,next)=>{
    console.log(err.message)
    const statusCode=res.statusCode?res.statusCode:500
    res.status(statusCode);

    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === "developement" ?err.stack:null
    })

}

export default errorHandler