import { CsvDto } from '../csv/dto/csv.dto';

export class DbRepository {
    db: CsvDto[];

    constructor() {
        this.db = [];
    }

    saveCsvData(list: CsvDto[]): void {
        this.db = Object.values([...this.db, ...list].reduce((prev, cur) => {
            return {
                ...prev,
                [cur.donor_id]: cur
            }
        }, {}));
    }

    getAllCsvData(): CsvDto[] {
        return this.db;
    }
}
