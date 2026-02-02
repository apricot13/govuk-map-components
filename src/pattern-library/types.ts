export interface PitsbyDocumentation {
  name: string;
  description: string;
  properties: Record<string, unknown>[];
  examples?: PitsbyExample[];
  visible?: boolean;
  id?: string;
}

export interface PitsbyExample {
  title: string;
  template: string;
  name?: string;
  description?: string;
  visible?: boolean;
}

export interface NunjucksDocumentation {
  name: string;
  description: string;
  id: string;
  visible: boolean;
  examples?: NunjucksDocumentation[];
}
