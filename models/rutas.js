const mongoose=require("mongoose");
const mongoosePaginate=require("mongoose-paginate");

const RutasSchema=mongoose.Schema({
    title:String,
    miniature:String,
    description:String,
    city:String,
    score:Number,
    idUserCreate:{
        type:String,
        unique:true,
    } ,
    path:{
        type:String,
        unique:true,
    },
    create_at:Date,
});

RutasSchema.plugin(mongoosePaginate);

module.exports=mongoose.model("Rutas",RutasSchema);