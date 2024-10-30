import { DynamicModule, Module, Provider } from '@nestjs/common'

import { GRABPASS_MODULE_OPTIONS } from './grabpass.constants'
import { GrabpassModuleOptions } from './grabpass.interface'
import { GrabpassService } from './grabpass.service'

@Module({
  providers: [GrabpassService],
  exports: [GrabpassService]
})
export class GrabpassModule {
  static forRoot(options: GrabpassModuleOptions): DynamicModule {
    const grabpassModuleOptionsProvider: Provider = {
      provide: GRABPASS_MODULE_OPTIONS,
      useValue: options
    }

    return {
      global: true,
      module: GrabpassModule,
      providers: [grabpassModuleOptionsProvider]
    }
  }
}
