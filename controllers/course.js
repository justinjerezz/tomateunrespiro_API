const Course=require("../models/courses");
const image=require("../utils/image");

async function createCourse(req,res) {
    const course =new Course(req.body);
    const imagePath=image.getFilePath(req.files.miniature);
    const miniature=imagePath;
    course.miniature=miniature;
    course.save((error,courseStroed)=>{
        if(error){
            res.status(400).send({msg:"Error al crear el curso"});
        }else{
            res.status(201).send(courseStroed);            
        }
    })
}

function getCourse(req,res){

    const {page=1,limit=10}=req.query

    const options={
        page:parseInt(page),
        limit:parseInt(limit),
    }

    Course.paginate({},options,(error,courses)=>{
        if(error){
            res.status(400).send({msg:"Erro al obtener los cursos"});
        }else{
            res.status(200).send(courses);
        }
    })

}

function updateCourse(req,res){
    const {id}=req.params;
    const courseData=req.body;


    if(req.files.miniature){
        const imagePath=image.getFilePath(req.files.miniature);
        courseData.miniature=imagePath;
    }

    Course.findByIdAndUpdate({_id:id},courseData,(error)=>{
        if(error){
            res.status(400).send({msg:"Erro al actualizar el curso"});
        }else{
            res.status(200).send({msg:"Actulización correcta"});
        }
    })
}

async function deleteCourse(req,res){

    const {id}=req.params;
    Course.findByIdAndDelete({_id:id},(error)=>{
        if(error){
            res.status(400).send({msg:"Error al eliminar el curso"});
        }else{
            res.status(200).send({msg:"Eliminación correcta"});
        }
    });
}


module.exports={
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse

}