import { Component, OnInit } from '@angular/core';
 
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'edr-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  exportExcel() {
 
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('CategorySheet');
    worksheet.columns = [

      { header: 'Label', key: 'name', width: 25 },
      { header: 'Description', key: 'brand', width: 25 },
      { header: 'Rank_definer', key: 'color', width: 25 },
      { header: 'LORD', key: 'price', width: 15, style: { font: { name: 'Arial Black', size:10} } },
    ];
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'category.xlsx');
    })
}

onFileChange(e){

}
}
