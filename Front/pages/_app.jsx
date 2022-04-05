import '../styles/globals.css'
import { AppContextProvider } from "../src/components/AppContext"

function MyApp({ Component, pageProps, ...otherProps }) {
  return (
    <AppContextProvider pageComponent={Component} router={otherProps.router}>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  )
}

export default MyApp
