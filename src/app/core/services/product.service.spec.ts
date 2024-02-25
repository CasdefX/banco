
import { of, throwError } from 'rxjs';
import { ProductService } from './product.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: any;
  const mockProducts = [

    {
      "id": "123sedr",
      "name": "toto 123123",
      "description": "toto11234123",
      "logo": "https://www.dotafire.com/images/hero/icon/axe.png",
      "date_release": "2024-02-24T00:00:00.000+00:00",
      "date_revision": "2025-02-24T00:00:00.000+00:00"
    }
  ];
  const mockProduct = {
    id: "123sedssr",
    name: "toto 123123",
    description: "toto11234123",
    logo: "https://www.dotafire.com/images/hero/icon/axe.png",
    date_release: "2024-02-24T00:00:00.000+00:00",
    date_revision: "2025-02-24T00:00:00.000+00:00"
  };

  const url = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products"
  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    }
    service = new ProductService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test getProductsList response ', () => {

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(mockProducts));
    service.getProductsList();
    /* .subscribe(products => {
      console.log("test service get")
      expect(products.length).toBeGreaterThanOrEqual(20);
      expect(products).toContain(2);
    }); */
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });
  //done is need to finish the test async other wey the test going to fail whit the timeout error

  it('should test  subscribe to getProductsList method', (done) => {

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(mockProducts));
    service.getProductsList()
      .subscribe({
        next: data => {
          expect(data).toEqual(mockProducts);
          done()
        }
      });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test  subscribe to getProductsList method throw error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not found'
    })
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errorResponse));
    service.getProductsList()
      .subscribe({
        error: err => {
          //console.log("test service get failed", err);
          expect(err.message).toContain('test 404 error')
          done();
        },
      });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });
  /*save data to the service*/
  it('should save product in the service using saveProduct method', (done) => {
    const mockProductdata = {
      id: "123sedssr",
      name: "toto 123123",
      description: "toto11234123",
      logo: "https://www.dotafire.com/images/hero/icon/axe.png",
      date_release: "2024/02/24",
      date_revision: "24/02/2025"
    };
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(mockProduct))
    service.saveProduct(mockProductdata)
      .subscribe({
        next: data => {
          expect(data).toEqual(mockProduct);
          done()
        }
      });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should test subscribe to saveProduct method throw error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not found'
    })
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(throwError(() => errorResponse));
    service.saveProduct(mockProduct)
      .subscribe({
        error: err => {
          // console.log("test service get failed", err);
          expect(err.message).toContain('test 404 error')
          done();
        },
      });

    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });


  //updateProduct

  it('should update product in the service using updateProduct method', (done) => {
    const mockProductdata = {
      id: "123sedssr",
      name: "toto 123123",
      description: "toto11234123",
      logo: "https://www.dotafire.com/images/hero/icon/axe.png",
      date_release: "2024/02/24",
      date_revision: "2025/02/24"
    };
    jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(mockProduct))

    service.updateProduct(mockProductdata)
      .subscribe({
        next: data => {
          expect(data).toEqual(mockProduct);
          done()
        }
      });
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
  });


  //removeProduct


  it('should remove product in the service using removeProduct method', (done) => {
    jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of("Product successfully removed"))
    const id = "123sedssr";
    service.removeProduct(id)
      .subscribe({
        next: data => {
          expect(data).toEqual("Product successfully removed");
          done()
        }
      });
    expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
  });
  /*  getProductsVerification*/
  it('should check id duplicate getProductsVerification method', (done) => {
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(true))
    const id = "123sedssr";
    service.getProductsVerification(id)
      .subscribe({
        next: data => {
          expect(data).toEqual(true);
          done()
        }
      });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
