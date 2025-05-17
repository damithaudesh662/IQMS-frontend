import { supabase } from "../lib/supabase";

export async function joinQueue(queueID: string, slot: string) {
  const {
    data: { user: currentUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (!currentUser?.id || userError) {
    return { error: userError?.message };
  }

  const { data, error: slotError } = await supabase
    .from("user_joined_queues")
    .insert([
      {
        user_id: currentUser?.id,
        queue_id: queueID,
        slot: slot,
      },
    ]);

  if (slotError) {
    return { error: slotError.message };
  }

  return { error: null };
}

export async function getQueuesByUserID() {
  const {
    data: { user: currentUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (!currentUser?.id || userError) {
    return { queues: [], error: userError?.message };
  }

  const { data: queues, error: queueError } = await supabase
    .from("user_joined_queues")
    .select(
      `
    id,  
    slot,
    institute_queues(
        institutes(
            institute_name
        ),
        queue_name,
        date,
        start_time,
        end_time,
        is_ongoing
    )
    `
    )
    .eq("user_id", currentUser?.id);

  if (queueError) {
    return { queues: [], error: queueError?.message };
  }

  return { queues: queues, error: null };
}

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

export async function getCurrentSlot(queueID: string) {
  const { data, error } = await supabase
    .from("institute_queues")
    .select("current_slot")
    .eq("id", queueID)
    .single();

  if (error) {
    return { currentSlot: 1, error: error };
  }

  return { currentSlot: data.current_slot, error: null };
}

export async function getQueueID(joinedQueueID: string) {
  const { data, error } = await supabase
    .from("user_joined_queues")
    .select("queue_id")
    .eq("id", joinedQueueID)
    .single();

  if (error) {
    console.log(error);
    return { queueID: 1, error: error };
  }

  return { queueID: data.queue_id, error: null };
}
