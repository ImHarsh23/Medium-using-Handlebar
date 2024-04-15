const fs = require("fs/promises");
const path = require("path");

const filePath1 = path.join(__dirname, "..","Database","Trending.json"); //Trending.json
const filePath2 = path.join(__dirname, "..","Database","Tag.json"); //Tag.json
const filePath3 = path.join(__dirname, "..","Database","Article.json"); //Tag.json


class controller{

    static getTrendingData(){
        return new Promise(async(resolve, reject) => {
            try{
                const data = await fs.readFile(filePath1);
                resolve(JSON.parse(data));
            }
            catch(err){
                reject(err);
            }
        })
    }

    static getTagData(){
        return new Promise(async(resolve, reject) => {
            try{
                const response = await fs.readFile(filePath2);
                const data = JSON.parse(response); 
                resolve(data);
            }
            catch(err){
                reject(err);
            }
        })
    }

    static getArticleData(){
        return new Promise(async (resolve, reject) => {
            try{
                const response = await  fs.readFile(filePath3);
                const data = JSON.parse(response);
                resolve(data);
            }
            catch(e){
                reject(e);
            }
        })
    }
}

module.exports = controller;