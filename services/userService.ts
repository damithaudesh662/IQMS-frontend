import { supabase } from "../lib/supabase";

export async function getDetailsForUserProfile(userID: string | null) {
  if (!userID) {
    return { error: "No user ID provided", data: null };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("address, display_name")
    .eq("id", userID)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
    return { error: error, data: null };
  }

  return { error: null, data };
}

export async function getUserId() {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return;
  }

  const id = userData?.user?.id;
  return id;
}

export async function updateUserProfile(
  userId: string,
  display_name: string,
  address: string
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ display_name, address })
    .eq("id", userId)
    .select();

  console.log("Rows updated:", data?.length);

  if (error) {
    console.error("Error updating profile:", error.message);
    return { error };
  }

  return { data };
}
