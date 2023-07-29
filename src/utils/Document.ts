import { Text } from "@codemirror/state";
import { Document } from "../interface/Document";
import { SANDBOX_TEMPLATES } from "../templates";

export const documents = new Map<string, Document>();

export const getDocument = (name: string): Document => {
  if (documents.has(name)) return documents.get(name)!;
  const documentContent: Document = {
    updates: [],
    pending: [],
    doc: "",
  };
  return documentContent;
};
