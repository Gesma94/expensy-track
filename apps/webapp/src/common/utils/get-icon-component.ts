import { IconType } from '@common/enums/icon';
import { PiCaretDown, PiCheck, PiNotePencil, PiTrash } from 'react-icons/pi';

export function getIconComponent(icon: IconType) {
  switch (icon) {
    case IconType.NotePencil:
      return PiNotePencil;
    case IconType.Trash:
      return PiTrash;
    case IconType.CaretDown:
      return PiCaretDown;
    case IconType.Check:
      return PiCheck;
  }
}
