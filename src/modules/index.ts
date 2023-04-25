import tweets from './tweets'
import notFound from './notFound';
import { errorHandler } from './errorHandler'

// Types
import type { Modules } from './types'

const modules: Modules = [tweets]

modules.push(notFound, errorHandler)

export default modules