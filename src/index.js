const express=require("express");
const {v4:uuidv4}=require("uuid");
const app=(express());
app.use(express.json());
app.listen(8888);


const user=[];

function veryfyIfUserExists(request,response,next){
    const {cpf}=request.headers;
    
    const users=user.find((users)=>users.cpf===cpf);
    
    if(!users){
        return response.status(400).json({message:"user not found"});
    }
    
    request.users=users;
    return next();
};


app.post("/user",(request,response)=>{
    const {name,cpf}=request.body;
    
    const users=user.some((users)=>users.cpf===cpf);
    
    if(users){
        return response.status(201).json({message:"error users already exists"})
    }
    
    user.push({
        name,
        cpf,
        id:uuidv4(),
        creat_at:new Date(),
        relatorio:[],
    });
    
    return response.status(201).json({message:"user create with sucessfull"});
    
});

app.get("/user",veryfyIfUserExists,(request,response)=>{
    const {users}=request;
    
    return response.status(201).json(users);
});


app.post("/carIn",veryfyIfUserExists,(request,response)=>{
    const{users}=request;
    const{carModel,cor}=request.body;
    
    
    const getIn={
        carModel,
        cor,
        enter_at:new Date(),
    }
    users.relatorio.push(getIn);

   
        return response.status(201).json({message:"car enter in garage"})
   
   
    
});

app.post("/carOut",veryfyIfUserExists,(request,response)=>{
    const {users}=request;
    const {carModel,cor}=request.body;
    
    const getOut={
        carModel,
        cor,
        enter_at:new Date(),
    }
    users.relatorio.push(getOut);
    return response.status(201).json({message:"car out garage"})
})