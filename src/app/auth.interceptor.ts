import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    intercept(req:HttpRequest<any>,next:HttpHandler):any{
        console.log('Intercepting')

        const token = localStorage.getItem('token');
        console.log('token: ',token)

        if(token){            
            const cloned = req.clone({
                headers:req.headers.set('Authorization',token)
            })

            return next.handle(cloned);
        }else{
            console.log(req)
            return next.handle(req);
        }
    }

    

}