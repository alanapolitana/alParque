 import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
 import { provideRouter } from '@angular/router';
 import { routes } from './app.routes';
 import { provideClientHydration } from '@angular/platform-browser';
 import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
 import { JwtService } from './services/auth/jwt.service';
 
 export const appConfig: ApplicationConfig = {
   providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(),
     provideHttpClient(withFetch()),
     {
       provide: HTTP_INTERCEPTORS,
       useClass: JwtService,
       multi: true
     }
   ]
 };
 