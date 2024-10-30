export function isFormDataString(value: string) {
  if (!value) return false;
  const lines = value.split(/\r\n/).filter(Boolean);

  const [boundary] = lines;

  const chunks: string[][] = [];
  let queue: string[] = [];

  for (const chunk of lines) {
    if (chunk === `${boundary}--`) {
      if (queue.length) {
        chunks.push(queue);
      }
      break;
    }

    if (chunk === boundary) {
      if (queue.length) {
        chunks.push(queue);
      }

      queue = [];
      continue;
    }

    queue.push(chunk);
  }

  if (!chunks.length) {
    return false;
  }

  return !chunks.some(item => !item[0].startsWith('Content-Disposition'));
}
