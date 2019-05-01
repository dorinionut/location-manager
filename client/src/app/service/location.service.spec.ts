import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocationService } from './location.service';
import { mockLocationList, mockLocation } from 'testing/constant/locations';

describe('LocationService', () => {
  let locationService: LocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LocationService
      ]
    });

    locationService = TestBed.get(LocationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });

  it('should search for locations', async(() => {
    const mockInput = mockLocationList.map(location => Object.assign({}, location));

    locationService.search()
      .subscribe(data => {
        expect(data.length).toEqual(mockLocationList.length);
        expect(data).toEqual(mockLocationList);
      });

    const req = httpMock.expectOne(`${locationService.server}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockInput);
  }));

  it('should update location', async(() => {
    const mockInput = Object.assign({}, mockLocation);
    const id = mockInput.id;

    locationService.update(mockInput)
      .subscribe(data => {
        expect(data).toEqual(mockLocation);
      });

    const req = httpMock.expectOne(`${locationService.server}/${id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockInput);
  }));

  it('should create location', async(() => {
    const mockInput = Object.assign({}, mockLocation);

    locationService.add(mockInput)
      .subscribe(data => {
        expect(data).toEqual(mockLocation);
      });

    const req = httpMock.expectOne(`${locationService.server}`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockInput);
  }));

  it('should get by ID', async(() => {
    const mockInput = Object.assign({}, mockLocation);

    locationService.getById(mockInput.id)
      .subscribe(data => {
        expect(data).toEqual(mockLocation);
      });

    const req = httpMock.expectOne(`${locationService.server}/${mockInput.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockInput);
  }));

  it('trigger error handler', async(() => {
    spyOn(locationService, 'errorHandler').and.callThrough();

    const mockInput = Object.assign({}, mockLocation);

    locationService.search()
      .subscribe(
        () => {},
        () => {
          expect(locationService.errorHandler).toHaveBeenCalled();
        }
      );

    const req = httpMock.expectOne(`${locationService.server}`)
      .error(new ErrorEvent(''), {
        status: 404,
        statusText: 'Not found'
      });
  }));
});
