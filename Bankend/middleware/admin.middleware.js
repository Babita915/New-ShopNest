const adminMiddleware=(req,res,next)=>{


    if(req.user.role !== "Admin"){

        return res.status(403).json({
            message:"Admin Access Required"
        });

    }


    next();

}


module.exports=adminMiddleware;