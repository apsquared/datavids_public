export default function UseCaseLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return    (
    <section className="pt-[150px] pb-[120px]">
    <div className="container">
      <div className="-mx-4 flex flex-wrap justify-center">
        <div className="w-full px-4 lg:w-8/12">
          <div>{children}</div>
        </div>
      </div>
      </div>
      </section>
    )
  }