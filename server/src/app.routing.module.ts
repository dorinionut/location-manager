import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import { appConfig } from './config';
import { LocationModule } from './location/location.module';

const Routes: Routes = [
    {
        path: `${appConfig.API_PREFIX}/locations`,
        module: LocationModule
    }
];

@Module({
    imports: [ RouterModule.forRoutes(Routes)],
    exports: [ RouterModule ]
})
export class RoutingModule {}