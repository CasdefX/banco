import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {

  req = req.clone({ headers: req.headers.set('authorId', "1") });
  return next(req);
};
