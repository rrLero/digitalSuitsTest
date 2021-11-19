import { Injectable } from '@nestjs/common';
import { CsvDto } from '../csv/dto/csv.dto';
import { DbRepository } from './db.repository';

@Injectable()
export class DbService {

    constructor(
        private dbRepository: DbRepository
    ) {
    }

    saveCsvData(list: CsvDto[]) {
        this.dbRepository.saveCsvData(list);
    }

    getAllData() {
        return this.dbRepository.getAllCsvData();
    }
}
