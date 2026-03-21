import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { prisma } from "~/prisma/prismaClient";

export const createContext = async () => {
  const cookieStore = cookies();
  
  // 環境変数を安全に取得（! を使わない）
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  // どちらかが空なら認証不可として処理を抜ける
  if (!supabaseUrl || !supabaseAnonKey) {
    return { user: null };
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser || !authUser.email) {
    return { user: null };
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: authUser.email },
    select: { id: true, role: true },
  });

  return {
    user: dbUser ? { id: dbUser.id, role: dbUser.role } : null,
  };
};
