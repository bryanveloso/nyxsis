import { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-xl">{children}</div>
    </div>
  )
}

export default Layout
