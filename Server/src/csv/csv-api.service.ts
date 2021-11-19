import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvDto } from './dto/csv.dto';
import * as csv from 'csv-parser';
import { Readable } from 'stream';
import { EmailDataDto } from './dto/emailData.dto';

@Injectable()
export class CsvApiService {
    constructor() {
    }

    async getAllCsvFilesNames(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir('./upload', (err, files) => {
                resolve(files);
            });
        })
    }

    async getDataFromCsvFile(fileName: string): Promise<CsvDto[]> {
        const resultsArr: CsvDto[] = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(`./upload/${fileName}`)
                .pipe(csv())
                .on('data', (data) => resultsArr.push(data))
                .on('end', () => {
                    resolve(resultsArr);
                });
        })
    }

    async getDataFromCsvFiles(): Promise<CsvDto[]> {
        const resultsArr: CsvDto[] = [];
        const files = await this.getAllCsvFilesNames();
        return new Promise((resolve, reject) => {
            files.forEach((file, i) => {
                fs.createReadStream(`./upload/${file}`)
                    .pipe(csv())
                    .on('data', (data) => resultsArr.push(data))
                    .on('end', () => {
                        if (i === files.length - 1) {
                            resolve(resultsArr);
                        }
                    });
            });
        })
    }

    createDataForEmail(list: CsvDto[]): EmailDataDto {
        const unnamedNumber = list.filter(item => !item.donor_name).length;
        return {
            totalNumber: list.length,
            totalValue: list.reduce((prev, curr) => prev + +curr.donation_amount, 0),
            anonymousPerc: Math.ceil(unnamedNumber / list.length * 100),
        }
    }
}
