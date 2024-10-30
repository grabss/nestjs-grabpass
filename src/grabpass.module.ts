import { DynamicModule, Module, Provider } from '@nestjs/common'

import { GrabpassModuleArgs } from './grabpass.interface'
import { grabpassProvider } from './grabpass.provider'

@Module({})
export class GrabpassModule {
  static forRoot(args: GrabpassModuleArgs): DynamicModule {
    const grabpassArgsProvider: Provider = {
      provide: 'GRABPASS_ARGS',
      useValue: args
    }

    return {
      module: GrabpassModule,
      providers: [grabpassArgsProvider, grabpassProvider],
      exports: ['GRABPASS']
    }
  }
}
