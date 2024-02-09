import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "../ui/button"

  export const PostAIModal = ({open,setOpen}: {open:boolean,setOpen:((open: boolean) => void) | undefined}) => {

    return(
        <>
        <Dialog open={open}  onOpenChange={setOpen} >
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Your AI Created Video Is Done.</DialogTitle>
            <DialogDescription>
                <p className="text-lg">
                Your video has been created by our AI.  Now&apos;s the fun part you can quickly tweak anything you don&apos;t like about the video.  
                </p>
                <p className="mt-3 text-lg">Change the font, the colors, or the voiceover.  It&apos;s yours to customize.</p>
                <p className="mt-3 text-lg">
                 Once you are happy click Render and your video will be ready in no time.  
                </p>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="text-white">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
        </Dialog>
        </>
    )
  }

