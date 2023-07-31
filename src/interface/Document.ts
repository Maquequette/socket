import { Update } from "@codemirror/collab";

export interface Document {
  updates: Update[];
  files: string;
  pending: ((value: any) => void)[];
}
