import { router } from "./trpc";
import { projectRouter } from "./routers/project";
import { entryRouter } from "./routers/entry";

export const appRouter = router({
  project: projectRouter,
  entry: entryRouter,
});

export type AppRouter = typeof appRouter;