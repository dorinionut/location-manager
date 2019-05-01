import { Module, HttpModule } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [LocationController],
    providers: [LocationService]
})
export class LocationModule {};