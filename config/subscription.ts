import { supabase } from "@/config/supabase";

export async function checkIsPaidUser(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from("subscriptions")
      .select("paid")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }) // latest
      .limit(1);

    if (error) throw error;
    if (!data || data.length === 0) return false;

    return data[0].paid === true;
  } catch (err) {
    console.error("checkIsPaidUser failed:", err);
    return false;
  }
}
