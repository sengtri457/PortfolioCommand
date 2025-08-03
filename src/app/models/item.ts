export type Command = {
  name: string;
  description: string;
  usage: string;
  example: string;
};

export type Social = {
  icon: string;
  link: string;
  name: string;
};

export type CommandHistory = {
  command: string;
  output: string;
  isHtml: boolean;
  htmlOutput?: string;
  timestamp: Date;
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};
