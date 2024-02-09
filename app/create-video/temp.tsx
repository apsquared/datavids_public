
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="w-full h-screen grid grid-cols-[1fr_2fr_1fr] gap-4 p-4">
      <div className="flex flex-col h-full gap-4 bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Scenes</h2>
        <div className="flex-1 overflow-y-auto space-y-2">
          <Card>
            <CardContent className="flex items-center justify-between">
              <span>Scene 1</span>
              <Button size="sm" variant="destructive">
                Remove
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between">
              <span>Scene 2</span>
              <Button size="sm" variant="destructive">
                Remove
              </Button>
            </CardContent>
          </Card>
        </div>
        <Button className="mt-auto">Add Scene</Button>
      </div>
      <div className="flex flex-col h-full gap-4 bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Scene Details</h2>
        <div className="flex-1 overflow-y-auto space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Scene Name</h3>

          </div>
          <div>
            <h3 className="text-sm font-semibold">Scene Description</h3>
            <textarea className="w-full h-32 bg-white shadow-none appearance-none dark:bg-gray-950" />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full gap-4 bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Media Player</h2>
        <div className="flex-1 rounded-lg overflow-hidden">
          <span className="w-full h-full object-cover rounded-md bg-muted" />
        </div>
      </div>
    </div>
  )
}

