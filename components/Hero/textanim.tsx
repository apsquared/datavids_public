"use client"
import {TextLoop} from "easy-react-text-loop"

export default function TextAnim() {
return (
    <TextLoop>
        <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-logo-blue-1 to-logo-blue-2">Tik Tok</span>
        <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-logo-blue-1 to-logo-blue-2">Reels</span>
        <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-logo-blue-1 to-logo-blue-2">Shorts</span>
        <span className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-logo-blue-1 to-logo-blue-2">Twitter</span>
    </TextLoop>
)

}