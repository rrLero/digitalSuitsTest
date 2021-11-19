import {Module} from '@nestjs/common';
import { DbService } from './db.service';
import { DbRepository } from './db.repository';

@Module({
    providers: [DbService, DbRepository],
    exports: [DbService]
})
export class DbModule {

}
