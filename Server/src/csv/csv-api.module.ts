import { Module } from '@nestjs/common';
import { CsvApiController } from './csv-api.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CsvApiService } from './csv-api.service';
import { DbModule } from '../db/db.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        MulterModule.register({
            dest: './upload',
            preservePath: true
        }),
        DbModule,
        MailModule,
    ],
    controllers: [CsvApiController],
    providers: [CsvApiService],
})
export class CsvApiModule {

}
