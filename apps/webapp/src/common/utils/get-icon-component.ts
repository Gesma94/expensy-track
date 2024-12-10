import { Icon } from '@common/enums/icon';
import { PiNotePencil, PiTrash } from 'react-icons/pi';

export function getIconComponent(icon: Icon) {
  switch (icon) {
    case Icon.NotePencil:
      return PiNotePencil;
    case Icon.Trash:
      return PiTrash;
  }
}
