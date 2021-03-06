import { LOGGER_CONFIG, LoggingService } from './services/logging.service'
import { SettingService } from './services/setting.service'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { LoginCardComponent } from './login-card/login-card.component'
import { CommonModule } from '@angular/common'
import { PlatformService } from './services/platform.service'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { WebSocketService } from './services/web-socket.service'
import { EnvironmentService } from './services/environment.service'
import { COOKIE_HOST_WHITELIST } from './services/http-cookie-interceptor.service'
import { ENV_CONFIG } from '../app.config'
import { NavbarService } from './navbar/navbar.service'
import { NewsletterComponent } from './newsletter/newsletter.component'
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2'
import { MaterialModule } from './material.module'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { SocialButtonDirective } from './directives/social-button.directive'
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FirebaseDatabaseService } from './services/firebase-database.service'
import { ApftModule } from './apft/material/apft.module'
import { APFT_STANDARDS } from './apft/apft.service'
import { ContentService } from './services/content.service'
import { PmKeysPipe } from './pipes/keys.pipe'
// import { FlexLayoutModule } from '@angular/flex-layout'

declare var __process_env__: any

export function fuseBoxConfigFactory() {
  return JSON.parse(__process_env__.angularAppConfig)
}

export function apftStandardFactory(db: FirebaseDatabaseService) {
  return db.get('apft-standards')
}

export function loggerConfigFactory(ps: PlatformService, gooogleAnalytics: Angulartics2GoogleAnalytics) {
  return {
    name: 'Angular Universal App',
    type: 'app',
    streams: [{
      level: 'error',
      stream: {
        write: (err: any) => {
          if (ps.isBrowser) {
            console.error('Application error', err)
            if ((window as any).ga) {
              gooogleAnalytics.exceptionTrack(err)
            } else {
              console.log('(Application error was not logged to analytics provider)')
            }
          } else {
            console.error(err)
          }
        }
      },
      type: 'raw'
    }]
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownToHtmlModule,
    ApftModule.forRoot({
      provide: APFT_STANDARDS,
      useFactory: apftStandardFactory,
      deps: [FirebaseDatabaseService]
    }),
    Angulartics2Module.forChild()
    // FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    Angulartics2Module,
    MaterialModule,
    ClickOutsideDirective,
    SocialButtonDirective,
    LoginCardComponent,
    FormsModule,
    ReactiveFormsModule,
    MarkdownToHtmlModule,
    ApftModule,
    NewsletterComponent,
    PmKeysPipe
    // FlexLayoutModule,
  ],
  entryComponents: [
    NewsletterComponent
  ],
  declarations: [
    NavbarComponent,
    ClickOutsideDirective,
    SocialButtonDirective,
    LoginCardComponent,
    NewsletterComponent,
    PmKeysPipe
  ],
  providers: [
    { provide: ENV_CONFIG, useFactory: fuseBoxConfigFactory },
    { provide: COOKIE_HOST_WHITELIST, useValue: ['angular.patrickmichalina.com'] },
    {
      provide: LOGGER_CONFIG,
      useFactory: loggerConfigFactory,
      deps: [PlatformService, Angulartics2GoogleAnalytics]
    },
    PlatformService,
    EnvironmentService,
    NavbarService,
    LoggingService,
    SettingService,
    WebSocketService,
    ContentService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}
