function getFilePath(file){
    const filePath = file.path;
    console.log("FILE PATH",filePath);
    const fileSplit= filePath.split("\\");
    console.log("FILE SPLIT",fileSplit);

    return `${fileSplit[1]}/${fileSplit[2]}`;

}

module.exports ={
    getFilePath
};