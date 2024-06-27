import Nav from "@components/Nav"
import Provider from "@components/Provider"
import "@styles/globals.css"

export const metadata = {
  title: "Prompia",
  description: "Discover and share AI prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lan="en">
      <body>
        <Provider>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">
          <Nav />
          {children}
        </div>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout