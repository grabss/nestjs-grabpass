import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { Grabpass } from 'grabpass'

import { GrabpassGraphqlService } from './grabpass-graphql.service'
import { GRABPASS, GRABPASS_MODULE_OPTIONS } from './grabpass.constants'
import { GrabpassModuleOptions } from './grabpass.interface'
import { GrabpassService } from './grabpass.service'

@Global()
@Module({
  providers: [GrabpassGraphqlService, GrabpassService],
  exports: [GrabpassGraphqlService, GrabpassService]
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
