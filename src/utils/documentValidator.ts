/**
 * documentValidator.ts - Utility to validate and verify all document fields
 * from the JSON are properly captured and accessible.
 */

export interface DocumentValidationResult {
  isValid: boolean;
  documentId: string;
  fields: {
    id: { present: boolean; value: string };
    type: { present: boolean; value: string };
    name: { present: boolean; value: string };
    content: { present: boolean; value: string };
    lastUpdated: { present: boolean; value: string };
    version: { present: boolean; value: string };
    author: { present: boolean; value: string };
  };
  missingFields: string[];
}

function readStringField(doc: Record<string, unknown>, key: string): string {
  const value = doc[key];
  return typeof value === 'string' ? value : '';
}

/**
 * Validates that a single document has all required fields from the JSON schema
 */
export const validateDocument = (doc: unknown): DocumentValidationResult => {
  const record =
    doc !== null && typeof doc === 'object' ? (doc as Record<string, unknown>) : {};
  const missingFields: string[] = [];
  const fields = {
    id: { present: !!readStringField(record, 'id'), value: readStringField(record, 'id') },
    type: { present: !!readStringField(record, 'type'), value: readStringField(record, 'type') },
    name: { present: !!readStringField(record, 'name'), value: readStringField(record, 'name') },
    content: {
      present: !!readStringField(record, 'content'),
      value: readStringField(record, 'content'),
    },
    lastUpdated: {
      present: !!readStringField(record, 'lastUpdated'),
      value: readStringField(record, 'lastUpdated'),
    },
    version: {
      present: !!readStringField(record, 'version'),
      value: readStringField(record, 'version'),
    },
    author: {
      present: !!readStringField(record, 'author'),
      value: readStringField(record, 'author'),
    },
  };

  Object.entries(fields).forEach(([key, fieldData]) => {
    if (!fieldData.present) {
      missingFields.push(key);
    }
  });

  return {
    isValid: missingFields.length === 0,
    documentId: readStringField(record, 'id') || 'unknown',
    fields,
    missingFields,
  };
};

/**
 * Validates all documents in a batch
 */
export const validateDocuments = (documents: unknown[]): DocumentValidationResult[] => {
  if (!Array.isArray(documents)) {
    return [];
  }
  return documents.map((doc) => validateDocument(doc));
};

/**
 * Generates a detailed report of document validation
 */
export const generateValidationReport = (
  documents: unknown[]
): { allValid: boolean; totalDocuments: number; summary: DocumentValidationResult[] } => {
  const results = validateDocuments(documents);
  return {
    allValid: results.every((r) => r.isValid),
    totalDocuments: documents.length,
    summary: results,
  };
};
