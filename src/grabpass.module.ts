import { DynamicModule, Module, Provider } from '@nestjs/common'

import { GrabpassModuleOptions } from './grabpass.interface'
import { GrabpassService } from './grabpass.service'

@Module({})
export class GrabpassModule {
  static forRoot(options: GrabpassModuleOptions): DynamicModule {
    const grabpassOptionsProvider: Provider = {
      provide: 'GRABPASS_MODULE_OPTIONS',
      useValue: options
    }

    return {
      module: GrabpassModule,
      providers: [grabpassOptionsProvider, GrabpassService],
      exports: [GrabpassService]
    }
  }
}
