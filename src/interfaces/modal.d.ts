declare interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  event?: Event;
}

import { Event } from './event';