
export interface ResponseOption {
  type: string;
  text: string;
  value?: string;
  className?: string;
  handler: (response: string, responseText: string) => void;
}
