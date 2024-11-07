import { Button } from "./ui/button"

function Footer() {
  return (
    <div className="flex bg-gray-900 py-2 gap-4 px-16 justify-center items-center">
        <Button variant="link" className="text-white" >Help</Button>
        <Button variant="link" className="text-white">Status</Button>
        <Button variant="link" className="text-white">About</Button>
        <Button variant="link" className="text-white">Privacy</Button>
        <Button variant="link" className="text-white">Terms</Button>
        <Button variant="link" className="text-white">Teams</Button>
    </div>
  )
}

export default Footer