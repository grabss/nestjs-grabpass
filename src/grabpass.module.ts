import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { Grabpass } from 'grabpass'

import { GRABPASS, GRABPASS_MODULE_OPTIONS } from './grabpass.constants'
import { GrabpassModuleOptions } from './grabpass.interface'
import { GrabpassService } from './grabpass.service'
import { GrabpassGraphqlAuthGuard } from './graphql/auth-guard'
import { GrabpassRestAuthGuard } from './rest/auth-guard'

@Global()
@Module({
  providers: [GrabpassGraphqlAuthGuard, GrabpassRestAuthGuard, GrabpassService],
  exports: [GrabpassGraphqlAuthGuard, GrabpassRestAuthGuard, GrabpassService]
})
export class GrabpassModule {
  static forRoot(options: GrabpassModuleOptions): DynamicModule {
    const grabpassModuleOptionsProvider: Provider = {
      provide: GRABPASS_MODULE_OPTIONS,
      useValue: options
    }

    const grabpassProvider: Provider = {
      provide: GRABPASS,
      useFactory: (options: GrabpassModuleOptions) => {
        return new Grabpass({
          config: options.config
        })
      },
      inject: [GRABPASS_MODULE_OPTIONS]
    }

    return {
      module: GrabpassModule,
      providers: [grabpassModuleOptionsProvider, grabpassProvider]
    }
  }
}
