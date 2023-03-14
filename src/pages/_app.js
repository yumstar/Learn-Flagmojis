import '@/styles/globals.css'
import { Noto_Color_Emoji } from '@next/font/google'
import store from "@/app/store"
import { Provider } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
const noto_color_emoji = Noto_Color_Emoji({weight: '400', subsets: ['emoji']})
export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
    <main className={noto_color_emoji.className}>
  <Component {...pageProps} />
    </main>
    </Provider>
  )
}
