import {
    Controller,
    Get,
    Logger,
    Post, Req,
    UploadedFile, UseInterceptors
} from '@nestjs/common';
import { ApiFile } from './api-file.decorator';
import * as csv from 'csv-parser';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fileFilter } from './file-filter';
import { CsvApiService } from './csv-api.service';
import { CsvDto } from './dto/csv.dto';
import { DbService } from '../db/db.service';
import { MailService } from '../mail/mail.service';
import { EmailDataDto } from './dto/emailData.dto';

@ApiTags('CsvApi')
@Controller('csv-api')
export class CsvApiController {
    private logger = new Logger('Csv Api Controller');

    constructor(
        private csvApiService: CsvApiService,
        private dbService: DbService,
        private mailService: MailService,
    ) {
    }

    @Post('/upload')
    @ApiConsumes('multipart/form-data')
    @ApiFile('file', true, { fileFilter: fileFilter('csv') })
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<CsvDto[]> {
        this.logger.log('Uploading Csv');
        const data = await this.csvApiService.getDataFromCsvFile(file.filename);
        this.dbService.saveCsvData(data);
        const dataForEmail = this.csvApiService.createDataForEmail(data);
        await this.mailService.sendUserConfirmation(
            'roman.levchenko1981@gmail.com',
            dataForEmail
        );
        return data;
    }

    @Get('/csv-data')
    async downloadAllCsv(): Promise<CsvDto[]> {
        return this.dbService.getAllData();
    }

    @Get('/csv-data/info')
    async getCsvDataInfo(): Promise<EmailDataDto> {
        return this.csvApiService.createDataForEmail(this.dbService.getAllData());
    }
}
