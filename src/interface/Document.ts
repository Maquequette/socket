import { Update } from "@codemirror/collab";
import { Text } from "@codemirror/state";

export interface Document {
  updates: Update[];
  doc: Text;
  pending: ((value: any) => void)[];
}
