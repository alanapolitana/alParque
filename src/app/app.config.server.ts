import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { ReactiveFormsModule } from '@angular/forms';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),ReactiveFormsModule
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
