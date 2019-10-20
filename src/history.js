// hash is chosen to allow for a static server to host all pages
// otherwise some funky stuff might need to be done in the future
import { createHashHistory } from "history"
export default createHashHistory()
