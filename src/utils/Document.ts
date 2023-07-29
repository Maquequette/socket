import { Text } from "@codemirror/state";
import { Document } from "../interface/Document";
import { SANDBOX_TEMPLATES } from "../templates";

export const documents = new Map<string, Document>();

export const getDocument = (name: string): Document | undefined => {
  if (documents.has(name)) return documents.get(name)!;
};
