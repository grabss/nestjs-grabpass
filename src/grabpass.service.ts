import { Inject, Injectable } from '@nestjs/common'

import { GRABPASS_MODULE_OPTIONS } from './grabpass.constants'
import { GrabpassModuleOptions } from './grabpass.interface'

@Injectable()
export class GrabpassService {
  constructor(
    @Inject(GRABPASS_MODULE_OPTIONS)
    private readonly options: GrabpassModuleOptions
  ) {}

  test() {
    return this.options
  }
}
