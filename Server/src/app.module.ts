import {Module} from '@nestjs/common';
import {CsvApiModule} from './csv/csv-api.module';
import {DbModule} from './db/db.module';
import { MailModule } from './mail/mail.module';


@Module({
    imports: [
        CsvApiModule,
        DbModule,
        MailModule,
    ],
    controllers: [],
})
export class AppModule {
}
