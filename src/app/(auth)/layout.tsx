import { Logo } from "@/components/svgs/logo"
import { Footer } from "@/components/ui/footer"
import { PropsWithChildren } from "react"

export default ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-full">
      <div className="bg-gradient-to-b from-sky-700 to-sky-800 pb-32">
        <nav className="border-b border-sky-300 border-opacity-25 lg:border-none">
          <div className="mx-auto max-w-xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <div className="w-24 text-white">
                    <Logo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <header className="py-10">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Register
            </h1>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="mx-auto max-w-xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
