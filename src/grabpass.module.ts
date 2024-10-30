import { DynamicModule, Module, Provider } from '@nestjs/common'

import { GrabpassModuleArgs } from './grabpass.interface'
import { grabpassProvider } from './grabpass.provider'
import { GrabpassService } from './grabpass.service'

@Module({
  exports: [GrabpassService]
})
export class GrabpassModule {
  static forRoot(args: GrabpassModuleArgs): DynamicModule {
    const grabpassArgsProvider: Provider = {
      provide: 'GRABPASS_ARGS',
      useValue: args
    }

    return {
      module: GrabpassModule,
      providers: [grabpassArgsProvider, grabpassProvider, GrabpassService],
      exports: [GrabpassService]
    }
  }
}
