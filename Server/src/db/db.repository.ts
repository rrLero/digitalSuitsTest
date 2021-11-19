import { CsvDto } from '../csv/dto/csv.dto';

export class DbRepository {
    db: CsvDto[];

    constructor() {
        this.db = [];
    }

    saveCsvData(list: CsvDto[]): void {
        this.db = [...this.db, ...list];
    }

    getAllCsvData(): CsvDto[] {
        return this.db;
    }
}
