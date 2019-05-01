import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { FrontendMiddleware } from './middleware/frontend.middleware';
import { RoutingModule } from './app.routing.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    LocationModule,
    RoutingModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FrontendMiddleware)
      .forRoutes('');
  }
}
