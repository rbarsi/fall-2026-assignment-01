import { promises as fs } from "fs";

export async function logStatusToFile(
  filePath: string,
  statusMessage: string,
): Promise<void> {
  const timestamp = new Date().toISOString();
  const logMessage = `${statusMessage} ${timestamp}\n`;

  await fs.appendFile(filePath, logMessage, "utf-8");
}