import type { Label as LabelPrisma } from '@expensy-track/prisma';
import type { Label as LabelGraphql } from '../../../../@types/graphql-generated.js';

export function LabelToPrisma(label: LabelGraphql | null): LabelPrisma | null {
  if (label === null) {
    return null;
  }

  return {
    id: label.id,
    createdAt: label.createdAt,
    displayName: label.displayName,
    updatedAt: label.updatedAt,
    userId: label.userId
  };
}

export function LabelToGraphql(label: LabelPrisma | null): LabelGraphql | null {
  if (label === null) {
    return null;
  }

  return {
    id: label.id,
    createdAt: label.createdAt,
    displayName: label.displayName,
    updatedAt: label.updatedAt,
    userId: label.userId
  };
}
