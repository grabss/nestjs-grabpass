import { DynamicModule, Module } from '@nestjs/common'

import { GrabpassService } from './grabpass.service'

@Module({
  providers: [GrabpassService],
  exports: [GrabpassService]
})
export class GrabpassModule {
  static forRoot(): DynamicModule {
    return {
      module: GrabpassModule
    }
  }
}
