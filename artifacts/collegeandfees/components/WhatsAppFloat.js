import { waLink } from "../lib/constants";
import { WaIcon } from "./WaButton";

const WA_MSG_FLOAT = "Hi, I need help with engineering college admission in Bangalore. Can you guide me?";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(WA_MSG_FLOAT)}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <WaIcon size={22} />
      Chat on WhatsApp
    </a>
  );
}
