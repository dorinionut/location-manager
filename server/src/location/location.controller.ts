import { Controller, Get, Res, Param, Req, Post, Put} from '@nestjs/common';
import { LocationService } from './location.service';
import { Request, Response } from 'express';

@Controller()
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocations(@Req() request: Request, @Res() response: Response) {
    return this.locationService
      .getLocations(request.query)
      .subscribe(result => {
          response.send(result);
      },
      (error => {
        response.statusCode = error.response.status;
        response.send(error.response.data);
      }));
  }

  @Get(':id')
  getLocation(@Res() response: Response, @Param() params) {
    return this.locationService
      .getLocation(params.id)
      .subscribe(result => {
          response.send(result);
      },
      (error => {
        response.statusCode = error.response.status;
        response.send(error.response.data);
      }));
  }

  @Post()
  addLocation(@Req() request: Request, @Res() response: Response, @Param() params) {
    return this.locationService
      .addLocation(request.body)
      .subscribe(result => {
          response.send(result);
      },
      (error => {
        response.statusCode = error.response.status;
        response.send(error.response.data);
      }));
  }

  @Put(':id')
  updateLocation(@Req() request: Request, @Res() response: Response, @Param() params) {
    return this.locationService
      .updateLocation(params.id, request.body)
      .subscribe(result => {
        response.send(result);
      },
      (error => {
        response.statusCode = error.response.status;
        response.send(error.response.data);
      }));
  }
}
