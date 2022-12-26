import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services';
 
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';  
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'edr-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private utility: UtilityService,
    private http:HttpClient) { }

  ngOnInit(): void {
  }

  exportExcel() {
 
    let workbook  = new Workbook();
    let worksheet = workbook.addWorksheet('CategorySheet');
    worksheet.columns = [

      { header: 'Label', key: 'name', width: 25 },
      { header: 'Description', key: 'brand', width: 25 },
      { header: 'Rank_definer', key: 'color', width: 25 },
      { header: 'LORD', key: 'price', width: 15, style: { font: { name: 'Arial Black', size:10} } },
    ];
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'category.xlsx');
    })
}

onFileChange(e){
  let fileList: FileList = e.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
       
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
      this.http.put('http://127.0.0.1:8000/api/v1/category/schema/add/105',formData).subscribe((data)=>{},(error)=>{console.log(error)})
        // this.utility.networkCall({url:'http://127.0.0.1:8000/api/v1/category/105',method:'POST',data:formData, headers:headers})
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )
    }

}
title = '';  
storeData: any;  
csvData: any;  
jsonData: any;  
textData: any;  
htmlData: any;  
fileUploaded: File;  
worksheet: any;  
uploadedFile(event) {  
  this.fileUploaded = event.target.files[0];  
  this.readExcel();  
}  
readExcel() {  
  let readFile = new FileReader();  
  readFile.onload = (e) => {  
    this.storeData = readFile.result;  
    var data = new Uint8Array(this.storeData);  
    var arr = new Array();  
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);  
    var bstr = arr.join("");  
    var workbook = XLSX.read(bstr, { type: "binary" });  
    var first_sheet_name = workbook.SheetNames[0];  
    this.worksheet = workbook.Sheets[first_sheet_name];  
  }  
  readFile.readAsArrayBuffer(this.fileUploaded);  
}  
readAsCSV() {  
  this.csvData = XLSX.utils.sheet_to_csv(this.worksheet);  
  const data: Blob = new Blob([this.csvData], { type: 'text/csv;charset=utf-8;' });  
  FileSaver.saveAs(data, "CSVFile" + new Date().getTime() + '.csv');  
}  
readAsJson() {  
  this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });  
  this.jsonData = JSON.stringify(this.jsonData);  
  const data: Blob = new Blob([this.jsonData], { type: "application/json" });  
  FileSaver.saveAs(data, "JsonFile" + new Date().getTime() + '.json');  
}  
readAsHTML() {  
  this.htmlData = XLSX.utils.sheet_to_html(this.worksheet);  
  const data: Blob = new Blob([this.htmlData], { type: "text/html;charset=utf-8;" });  
  FileSaver.saveAs(data, "HtmlFile" + new Date().getTime() + '.html');  
}  
readAsText() {  
  this.textData = XLSX.utils.sheet_to_txt(this.worksheet);  
  const data: Blob = new Blob([this.textData], { type: 'text/plain;charset=utf-8;' });  
  FileSaver.saveAs(data, "TextFile" + new Date().getTime() + '.txt');  
}  

}
