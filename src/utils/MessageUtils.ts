class MessageUtils {
  static min = (subject: string, value: number) => `${subject} must have at least ${value} characters`;
  static max = (subject: string, value: number) => `${subject} only up to ${value} characters`;
}

export default MessageUtils;
