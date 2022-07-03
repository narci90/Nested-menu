export interface NestedMenuItem {
  id: number;
  name: string;
  parentId: number | null;
  route?: string;
  params?: string[];
  disabled?: boolean;
}
