import { Inject, Injectable } from '@nestjs/common'
import { Grabpass } from 'grabpass'

@Injectable()
export class GrabpassService {
  constructor(@Inject('GRABPASS') private readonly grabpass: Grabpass) {}

  test() {
    return this.grabpass
  }
}
