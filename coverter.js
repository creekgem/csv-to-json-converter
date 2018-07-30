const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const fileReader = (file)=>{
    const filePath = path.join(__dirname, file);
    fs.readFile(file, (err, data)=>{

        if(err) return console.error(err);
        
        data = data.toString();
        const toDataArray = data.split('\n');
        
        const toDataItems = [];
        let dataTitles;
        
        toDataArray.forEach((dataRow, i)=>{
            dataRow = dataRow.replace('\r', '');
            if(i != 0 && dataRow != '')
                toDataItems.push(dataRow.split(','));
            else if(i == 0)
                dataTitles = dataRow.split(',');
        });
        
        let toDataJson = '[';
        toDataItems.forEach((dataRow, i) => {
            toDataJson += '{'
            dataRow.forEach((dataItem, i) =>{
                toDataJson += `"${dataTitles[i]}": "${dataItem}"`
                if(dataRow.length-1 != i){
                    toDataJson += ','
                }
            });
            toDataJson += '}'
            if(toDataItems.length-1 != i){
                toDataJson += ','
            }
        });
        toDataJson += "]";
        
        fileWriter(toDataJson);
        console.log(JSON.parse(toDataJson));

    });

}

const fileWriter = (data)=>{
    const fileName = `converted_json_${uuidv1()}.json`;
    fs.writeFile(fileName, data, (err)=>{
        if(err) return console.error(err.message);
        console.log('Convered into JSON, file:', fileName);
    });
}

fileReader('customer-data.csv');