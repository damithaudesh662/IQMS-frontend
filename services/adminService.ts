import { supabase } from "../lib/supabase";

export async function getDetailsForAdminDashboard(userID: string) {
  const { data, error } = await supabase
    .from("institute_admins")
    .select(
      `
      institutes(
        institute_name,
        address,
        institute_queues(count)
      )
    `
    )
    .eq("user_id", userID)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
    return { error: error };
  }

  const instituteData = data?.institutes as any;
  const instituteName = instituteData.institute_name;
  const instituteAddress = instituteData.address;
  const queueCount = instituteData.institute_queues[0].count || 0;

  return {
    instituteName,
    instituteAddress,
    queueCount,
    error: error,
  };
}
