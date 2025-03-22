import { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-full bg-blue-900">
      <div className="mx-auto max-w-xl">{children}</div>
    </div>
  )
}

export default Layout
