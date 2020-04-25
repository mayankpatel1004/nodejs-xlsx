var xlsx = require("xlsx");
var wb = xlsx.readFile('rex.xlsx',{cellDates:true});
var ws = wb.Sheets["Rex-Liquor-Data"];
var data = xlsx.utils.sheet_to_json(ws);
var newData = data.map(function(record){
    record.Net = record.Cost - record.Sales;
    delete record.Sales;
    delete record.Cost;
    return record;
});
//console.log(newData);

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWB,newWS,"New Data");
xlsx.writeFile(newWB,"New Data File.xlsx");