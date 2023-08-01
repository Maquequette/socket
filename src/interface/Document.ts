import { Update } from "@codemirror/collab";
import { Text } from "@codemirror/state";

export interface Document {
  files: Map<
    string,
    {
      code: Text;
      updates: Update[];
      pending: ((value: any) => void)[];
    }
  >;
}
