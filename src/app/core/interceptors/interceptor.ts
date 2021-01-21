import { Injectable, Inject, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from '../services';



@Injectable()

export class Interceptor {
    // implements HttpInterceptor
    constructor(private global: GlobalService, private router: Router) { }

    //setting header globally
    private applyCredentials = (req: HttpRequest<any>, token: string) => {
        return req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: "JWT " + token
            }
        });
    }

    //intercepting request to find if token is expired or not
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //passing token to applyCredentials function
        const authReq = this.applyCredentials(req, this.global.token);

        //handling request
        return next.handle(authReq)
            .pipe(map((event: HttpEvent<any>) => {
                //debugger;
                //returning response on request success
                if (event instanceof HttpResponse) {
                    return event;
                }
            }),
                catchError((error: any) => {
                    //handling error
                    if (error instanceof HttpErrorResponse) {
                        //if error is 401 unauthorized
                        if (error.status === 401) {
                            //logOut(true);
                            //this.router.navigate(['/signin'])
                            this.global.logOut();
                        }
                        return throwError(error);

                    } else {
                        return throwError(error);
                    }
                })
            )


    }
}
