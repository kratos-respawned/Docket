import { auth } from "@/auth";
import { createServerActionProcedure } from "zsa";
const authProcedureBase = createServerActionProcedure().handler(async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated");
    }

    return {
      ...session.user,
    };
  } catch {
    throw new Error("User not authenticated");
  }
});
export const authedProcedure = authProcedureBase.createServerAction();
