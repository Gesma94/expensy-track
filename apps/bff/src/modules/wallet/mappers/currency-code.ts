import { $Enums } from '@expensy-track/prisma';
import { CurrencyCode } from '../../../@types/graphql-generated.js';

export function CurrencyCodeToPrisma(currencyCode: CurrencyCode): $Enums.CurrencyCode {
  switch (currencyCode) {
    case CurrencyCode.Eur:
      return $Enums.CurrencyCode.EUR;
    case CurrencyCode.Gbp:
      return $Enums.CurrencyCode.GBP;
    case CurrencyCode.Usd:
      return $Enums.CurrencyCode.USD;
  }
}

export function CurrencyCodeToGraphql(categoryIcon: $Enums.CurrencyCode): CurrencyCode {
  switch (categoryIcon) {
    case $Enums.CurrencyCode.EUR:
      return CurrencyCode.Eur;
    case $Enums.CurrencyCode.GBP:
      return CurrencyCode.Gbp;
    case $Enums.CurrencyCode.USD:
      return CurrencyCode.Usd;
  }
}
