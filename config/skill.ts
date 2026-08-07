import { SkillCategory } from "@/lib/generated/prisma/client";

type SkillDefinition = {
  name: string;
  normalizedName: string;
  aliases: string[];
  category: SkillCategory;
};

export const skills: SkillDefinition[] = [
  // Languages
  {
    name: "JavaScript",
    normalizedName: "javascript",
    aliases: ["js"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "TypeScript",
    normalizedName: "typescript",
    aliases: ["ts"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Python",
    normalizedName: "python",
    aliases: ["py"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Java",
    normalizedName: "java",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "C#",
    normalizedName: "c#",
    aliases: ["c sharp", "cs"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "C++",
    normalizedName: "c++",
    aliases: ["cpp"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "C",
    normalizedName: "c",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Go",
    normalizedName: "go",
    aliases: ["golang"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Rust",
    normalizedName: "rust",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "PHP",
    normalizedName: "php",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Ruby",
    normalizedName: "ruby",
    aliases: ["rb"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Swift",
    normalizedName: "swift",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Kotlin",
    normalizedName: "kotlin",
    aliases: ["kt"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "SQL",
    normalizedName: "sql",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "HTML5",
    normalizedName: "html5",
    aliases: ["html"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "CSS3",
    normalizedName: "css3",
    aliases: ["css"],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Elixir",
    normalizedName: "elixir",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Scala",
    normalizedName: "scala",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "R",
    normalizedName: "r",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },
  {
    name: "Dart",
    normalizedName: "dart",
    aliases: [],
    category: SkillCategory.LANGUAGE,
  },

  // Frameworks
  {
    name: "React",
    normalizedName: "react",
    aliases: ["react.js", "reactjs"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Next.js",
    normalizedName: "next.js",
    aliases: ["nextjs", "next"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Angular",
    normalizedName: "angular",
    aliases: ["angularjs", "ng"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Vue.js",
    normalizedName: "vue.js",
    aliases: ["vue", "vuejs"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Svelte",
    normalizedName: "svelte",
    aliases: [],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Nuxt.js",
    normalizedName: "nuxt.js",
    aliases: ["nuxt", "nuxtjs"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Spring Boot",
    normalizedName: "spring boot",
    aliases: ["spring", "springboot"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Django",
    normalizedName: "django",
    aliases: [],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Flask",
    normalizedName: "flask",
    aliases: [],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "FastAPI",
    normalizedName: "fastapi",
    aliases: ["fast api"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Express.js",
    normalizedName: "express.js",
    aliases: ["express", "expressjs"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "NestJS",
    normalizedName: "nestjs",
    aliases: ["nest", "nest.js"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Laravel",
    normalizedName: "laravel",
    aliases: [],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Ruby on Rails",
    normalizedName: "ruby on rails",
    aliases: ["rails", "ror"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "ASP.NET Core",
    normalizedName: "asp.net core",
    aliases: ["asp.net", "aspnet"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "SvelteKit",
    normalizedName: "sveltekit",
    aliases: ["svelte kit"],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Remix",
    normalizedName: "remix",
    aliases: [],
    category: SkillCategory.FRAMEWORK,
  },
  {
    name: "Astro",
    normalizedName: "astro",
    aliases: [],
    category: SkillCategory.FRAMEWORK,
  },

  // Runtimes
  {
    name: "Node.js",
    normalizedName: "node.js",
    aliases: ["node", "nodejs", "node js"],
    category: SkillCategory.RUNTIME,
  },
  {
    name: "Deno",
    normalizedName: "deno",
    aliases: [],
    category: SkillCategory.RUNTIME,
  },
  {
    name: "Bun",
    normalizedName: "bun",
    aliases: [],
    category: SkillCategory.RUNTIME,
  },
  {
    name: ".NET",
    normalizedName: ".net",
    aliases: ["dotnet", "dot net"],
    category: SkillCategory.RUNTIME,
  },

  // Databases
  {
    name: "PostgreSQL",
    normalizedName: "postgresql",
    aliases: ["postgres", "pgsql"],
    category: SkillCategory.DATABASE,
  },
  {
    name: "MySQL",
    normalizedName: "mysql",
    aliases: [],
    category: SkillCategory.DATABASE,
  },
  {
    name: "MongoDB",
    normalizedName: "mongodb",
    aliases: ["mongo"],
    category: SkillCategory.DATABASE,
  },
  {
    name: "Redis",
    normalizedName: "redis",
    aliases: [],
    category: SkillCategory.DATABASE,
  },
  {
    name: "SQLite",
    normalizedName: "sqlite",
    aliases: [],
    category: SkillCategory.DATABASE,
  },
  {
    name: "DynamoDB",
    normalizedName: "dynamodb",
    aliases: ["dynamo"],
    category: SkillCategory.DATABASE,
  },
  {
    name: "Elasticsearch",
    normalizedName: "elasticsearch",
    aliases: ["elastic", "es"],
    category: SkillCategory.DATABASE,
  },
  {
    name: "Supabase",
    normalizedName: "supabase",
    aliases: [],
    category: SkillCategory.DATABASE,
  },
  {
    name: "ClickHouse",
    normalizedName: "clickhouse",
    aliases: [],
    category: SkillCategory.DATABASE,
  },
  {
    name: "Pinecone",
    normalizedName: "pinecone",
    aliases: [],
    category: SkillCategory.DATABASE,
  },

  // Cloud Platforms
  {
    name: "AWS",
    normalizedName: "aws",
    aliases: ["amazon web services"],
    category: SkillCategory.CLOUD,
  },
  {
    name: "Azure",
    normalizedName: "azure",
    aliases: ["microsoft azure"],
    category: SkillCategory.CLOUD,
  },
  {
    name: "Google Cloud Platform",
    normalizedName: "google cloud platform",
    aliases: ["gcp", "google cloud"],
    category: SkillCategory.CLOUD,
  },
  {
    name: "Cloudflare",
    normalizedName: "cloudflare",
    aliases: [],
    category: SkillCategory.CLOUD,
  },
  {
    name: "Vercel",
    normalizedName: "vercel",
    aliases: [],
    category: SkillCategory.CLOUD,
  },
  {
    name: "Netlify",
    normalizedName: "netlify",
    aliases: [],
    category: SkillCategory.CLOUD,
  },
  {
    name: "Heroku",
    normalizedName: "heroku",
    aliases: [],
    category: SkillCategory.CLOUD,
  },
  {
    name: "DigitalOcean",
    normalizedName: "digitalocean",
    aliases: ["do"],
    category: SkillCategory.CLOUD,
  },

  // DevOps & Infrastructure
  {
    name: "Docker",
    normalizedName: "docker",
    aliases: ["containers"],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "Kubernetes",
    normalizedName: "kubernetes",
    aliases: ["k8s"],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "Terraform",
    normalizedName: "terraform",
    aliases: ["tf"],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "Ansible",
    normalizedName: "ansible",
    aliases: [],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "Jenkins",
    normalizedName: "jenkins",
    aliases: [],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "GitHub Actions",
    normalizedName: "github actions",
    aliases: ["gh actions", "gha"],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "GitLab CI/CD",
    normalizedName: "gitlab ci/cd",
    aliases: ["gitlab ci"],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "Prometheus",
    normalizedName: "prometheus",
    aliases: [],
    category: SkillCategory.DEVOPS,
  },
  {
    name: "Grafana",
    normalizedName: "grafana",
    aliases: [],
    category: SkillCategory.DEVOPS,
  },

  // Libraries & State Management
  {
    name: "Redux",
    normalizedName: "redux",
    aliases: [],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "Tailwind CSS",
    normalizedName: "tailwind css",
    aliases: ["tailwind", "tailwindcss"],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "Prisma",
    normalizedName: "prisma",
    aliases: ["prisma orm"],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "Drizzle ORM",
    normalizedName: "drizzle orm",
    aliases: ["drizzle"],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "GraphQL",
    normalizedName: "graphql",
    aliases: ["gql"],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "tRPC",
    normalizedName: "trpc",
    aliases: [],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "Shadcn UI",
    normalizedName: "shadcn ui",
    aliases: ["shadcn"],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "TanStack Query",
    normalizedName: "tanstack query",
    aliases: ["react query"],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "Pandas",
    normalizedName: "pandas",
    aliases: [],
    category: SkillCategory.LIBRARY,
  },
  {
    name: "NumPy",
    normalizedName: "numpy",
    aliases: [],
    category: SkillCategory.LIBRARY,
  },

  // Developer Tools
  {
    name: "Git",
    normalizedName: "git",
    aliases: [],
    category: SkillCategory.TOOL,
  },
  {
    name: "GitHub",
    normalizedName: "github",
    aliases: ["gh"],
    category: SkillCategory.TOOL,
  },
  {
    name: "Postman",
    normalizedName: "postman",
    aliases: [],
    category: SkillCategory.TOOL,
  },
  {
    name: "Webpack",
    normalizedName: "webpack",
    aliases: [],
    category: SkillCategory.TOOL,
  },
  {
    name: "Vite",
    normalizedName: "vite",
    aliases: [],
    category: SkillCategory.TOOL,
  },
  {
    name: "ESLint",
    normalizedName: "eslint",
    aliases: [],
    category: SkillCategory.TOOL,
  },
  {
    name: "Figma",
    normalizedName: "figma",
    aliases: [],
    category: SkillCategory.TOOL,
  },
  {
    name: "VS Code",
    normalizedName: "vs code",
    aliases: ["vscode", "visual studio code"],
    category: SkillCategory.TOOL,
  },

  // Testing Frameworks
  {
    name: "Jest",
    normalizedName: "jest",
    aliases: [],
    category: SkillCategory.TESTING,
  },
  {
    name: "Vitest",
    normalizedName: "vitest",
    aliases: [],
    category: SkillCategory.TESTING,
  },
  {
    name: "Cypress",
    normalizedName: "cypress",
    aliases: [],
    category: SkillCategory.TESTING,
  },
  {
    name: "Playwright",
    normalizedName: "playwright",
    aliases: [],
    category: SkillCategory.TESTING,
  },
  {
    name: "PyTest",
    normalizedName: "pytest",
    aliases: [],
    category: SkillCategory.TESTING,
  },

  // Mobile Development
  {
    name: "React Native",
    normalizedName: "react native",
    aliases: ["rn"],
    category: SkillCategory.MOBILE,
  },
  {
    name: "Flutter",
    normalizedName: "flutter",
    aliases: [],
    category: SkillCategory.MOBILE,
  },
  {
    name: "SwiftUI",
    normalizedName: "swiftui",
    aliases: [],
    category: SkillCategory.MOBILE,
  },
  {
    name: "Jetpack Compose",
    normalizedName: "jetpack compose",
    aliases: ["compose"],
    category: SkillCategory.MOBILE,
  },

  // AI & Data Science
  {
    name: "PyTorch",
    normalizedName: "pytorch",
    aliases: ["torch"],
    category: SkillCategory.AI,
  },
  {
    name: "TensorFlow",
    normalizedName: "tensorflow",
    aliases: ["tf"],
    category: SkillCategory.AI,
  },
  {
    name: "OpenAI API",
    normalizedName: "openai api",
    aliases: ["openai"],
    category: SkillCategory.AI,
  },
  {
    name: "LangChain",
    normalizedName: "langchain",
    aliases: [],
    category: SkillCategory.AI,
  },

  // Architectures & Protocols
  {
    name: "REST API Design",
    normalizedName: "rest api design",
    aliases: ["rest api", "restful"],
    category: SkillCategory.OTHER,
  },
  {
    name: "WebSockets",
    normalizedName: "websockets",
    aliases: ["websocket", "ws"],
    category: SkillCategory.OTHER,
  },
  {
    name: "gRPC",
    normalizedName: "grpc",
    aliases: [],
    category: SkillCategory.OTHER,
  },
  {
    name: "Apache Kafka",
    normalizedName: "apache kafka",
    aliases: ["kafka"],
    category: SkillCategory.OTHER,
  },
];