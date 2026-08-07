import "dotenv/config";
import { prisma } from "../lib/prisma";
import { writeFileSync } from "fs";

async function main() {
  const jobs = await prisma.jobPosting.findMany({
    select: {
      title: true,
      description: true,
    },
  });

  console.log(`Loaded ${jobs.length} jobs...\n`);

  const text = jobs
    .map((job) => `${job.title} ${job.description}`)
    .join(" ");

  const normalized = text
    .toLowerCase()
    .replace(/[^\w+#. ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = normalized.split(" ");

  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "for",
    "to",
    "of",
    "in",
    "on",
    "at",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "this",
    "that",
    "these",
    "those",
    "with",
    "without",
    "into",
    "from",
    "you",
    "your",
    "our",
    "their",
    "they",
    "them",
    "we",
    "us",
    "will",
    "can",
    "may",
    "must",
    "should",
    "have",
    "has",
    "had",
    "as",
    "it",
    "its",
    "if",
    "than",
    "then",
    "also",
    "not",
    "all",
    "using",
    "use",
    "used",
    "work",
    "working",
    "team",
    "teams",
    "experience",
    "developer",
    "engineer",
    "software",
    "job",
    "description",
    "responsibilities",
    "requirements",
    "required",
    "preferred",
  ]);

  const frequency = new Map<string, number>();

  for (const word of words) {
    if (word.length < 2) continue;

    if (stopWords.has(word)) continue;

    frequency.set(word, (frequency.get(word) ?? 0) + 1);
  }

  const sorted = [...frequency.entries()].sort((a, b) => b[1] - a[1]);

  console.table(
    sorted.slice(0, 100).map(([word, count]) => ({
      word,
      count,
    }))
  );

  const csv = [
    "word,count",
    ...sorted.map(([word, count]) => `${word},${count}`),
  ].join("\n");

  writeFileSync("skill-discovery.csv", csv);

  console.log("\n✅ CSV exported to skill-discovery.csv");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });