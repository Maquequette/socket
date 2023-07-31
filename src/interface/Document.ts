import { Update } from "@codemirror/collab";
import { Text } from "@codemirror/state";

export interface Document {
  updates: Update[];
  files: Map<string, Text>;
  pending: ((value: any) => void)[];
}
