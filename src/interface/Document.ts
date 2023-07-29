import { Update } from "@codemirror/collab";

export interface Document {
  updates: Update[];
  doc: Text;
  pending: ((value: any) => void)[];
}
