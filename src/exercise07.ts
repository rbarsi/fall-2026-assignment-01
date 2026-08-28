import { readFileSync } from "fs";

export type Gradebook = {
  [student: string]: {
    [subject: string]: number;
  };
};

export function calculateSubjectAverage(subject: string): number {
  const data = readFileSync("data/gradebook.json", "utf-8");
  const gradebook: Gradebook = JSON.parse(data);

  const grades = Object.values(gradebook)
    .filter((studentGrades) => studentGrades[subject] !== undefined)
    .map((studentGrades) => studentGrades[subject]);

  if (grades.length === 0) {
    return 0;
  }

  const total = grades.reduce((sum, grade) => sum + grade, 0);

  return total / grades.length;
}
