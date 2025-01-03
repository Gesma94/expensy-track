import { IconType } from '@common/enums/icon';
import {
  PiArrowSquareIn,
  PiArrowSquareOut,
  PiCaretDown,
  PiCheck,
  PiDownloadSimple,
  PiExport,
  PiGitMerge,
  PiMagnifyingGlass,
  PiNotePencil,
  PiPlus,
  PiTrash,
  PiX
} from 'react-icons/pi';

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
    case IconType.Plus:
      return PiPlus;
    case IconType.GitMerge:
      return PiGitMerge;
    case IconType.Close:
      return PiX;
    case IconType.ArrowSquareIn:
      return PiArrowSquareIn;
    case IconType.ArrowSquareOut:
      return PiArrowSquareOut;
    case IconType.Export:
      return PiExport;
    case IconType.Import:
      return PiDownloadSimple;
    case IconType.Search:
      return PiMagnifyingGlass;
  }
}
