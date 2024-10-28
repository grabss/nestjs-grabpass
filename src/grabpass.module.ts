import { DynamicModule, Module } from '@nestjs/common'

@Module({})
export class GrabpassModule {
  static forRoot(): DynamicModule {
    return {
      module: GrabpassModule,
      providers: []
    }
  }
}
