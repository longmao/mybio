import STORAGE_KEY  from './mutation-types'
import createLogger from '../../asset/js/logger'
import createMutationsSharer from 'vuex-shared-mutations'



export default process.env.NODE_ENV !== 'production'
  ? [createMutationsSharer({ predicate: ['ADV_INFO_UPDATED'] }), createLogger()]
  : [createMutationsSharer({ predicate: ['ADV_INFO_UPDATED'] })]
