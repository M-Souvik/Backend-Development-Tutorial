
const { log } = require('console');
const http = require('http');
const fs = require('fs');
//Creating a file using node
// fs.writeFile("hello.txt","Welcome to nodejs tutorial",function (err) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log('Created a file');
//     }
// })
// // //Adding some text in file
// fs.appendFile("hello.txt","This is just a file to test the function",function (err) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log('Edited a file successfully');
//     }
// })
// // //renaming the file
// fs.rename("hello.txt","tutorial.txt",function (err) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log('Renamed filename');
//     }
// })
// // //Coping a file
// fs.copyFile("tutorial.txt","./copy/test.txt",function (err) {
//     if (err) {
//         console.log(err.message);
//     }else{
//         console.log('Copied a file');
//     }
// })
// // //Deleting a file
// fs.unlink("hello.txt",function (err) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log('Deleted a file');
//     }
// })
// // //Removing a directory
// fs.rmdir("./copy",{recursive: true},function (err) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log('removed a file');
//     }
// })



//Creating a server
const server=http.createServer()
// //streams
server.on('request',(req,res) =>{
    // const rstream=fs.createReadStream('tutorial.txt');
    // rstream.on('data',(chunkdata)=>{
    //     res.write(chunkdata)
    // })
    // rstream.on('end',()=>{
    //     res.end();
    // });
    // rstream.on('error',(err)=>{
    //     console.log(err)
    // })
    // fs.readFile('tutorial.txt',(err,data)=>{
    //     if(err) return console.error(err);
    //     res.end(data.toString());
    // })
    const fileStream = fs.createReadStream('tutorial.txt');
const buffer = [];
// const buffer=new Buffer.from('tutorial.txt');
fileStream.on('data', (chunk) => {
    buffer.push(chunk);
  });
  fileStream.on('end', (req,res) => {
    const fileBuffer = Buffer.concat(buffer);
    console.log(fileBuffer.toString()); // prints the file contents as a string
  });
  })

server.listen(3002, '127.0.0.1', ()=>{
    console.log('running at 3002')
}); 