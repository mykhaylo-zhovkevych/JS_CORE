import ClickableRowDemo from './ClickableRowDemo.jsx'
import ModalDemo from './ModalDemo.jsx'
import OutsideClickDemo from './OutsideClickDemo.jsx'
import PhasesDemo from './PhasesDemo.jsx'
import PortalBubblingDemo from './PortalBubblingDemo.jsx'

export default function StopPropagationSection() {
  return (
    <>
      <PhasesDemo />
      <ClickableRowDemo />
      <ModalDemo />
      <PortalBubblingDemo />
      <OutsideClickDemo />
    </>
  )
}
