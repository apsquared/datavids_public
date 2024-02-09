'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>

    <body className="flex justify-center items-center h-screen">
        <div className="text-center">
        <h2 className="text-2xl">Something went wrong! Sorry about that.</h2>
        <button className="underline" onClick={() => reset()}>Click here to try again, this usually works.</button>
        </div>
      </body>
    </html>
  )
}