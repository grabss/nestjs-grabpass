import { Inject, Injectable } from '@nestjs/common'
import { Grabpass } from 'grabpass'

import { GRABPASS } from './grabpass.constants'

@Injectable()
export class GrabpassService {
  constructor(@Inject(GRABPASS) private readonly grabpass: Grabpass) {}

  test() {
    return this.grabpass
  }
}
