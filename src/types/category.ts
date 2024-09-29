export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  audio: {
    itemAudio: string;
    question: string;
    success: string;
    error: string;
    warning: string;
  };
}
