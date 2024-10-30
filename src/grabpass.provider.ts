import { Provider } from '@nestjs/common'
import { Grabpass } from 'grabpass'

import { GrabpassModuleArgs } from './grabpass.interface'

export const grabpassProvider: Provider = {
  provide: 'GRABPASS',
  useFactory: (args: GrabpassModuleArgs) => {
    return new Grabpass({
      config: args.config
    })
  },
  inject: ['GRABPASS_ARGS']
}
