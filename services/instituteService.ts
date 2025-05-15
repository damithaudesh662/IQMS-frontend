import { adminInfo, tempAdminInfo } from "@/interfaces/Institute";
import { supabase } from "../lib/supabase";

export async function getAllInstitutes() {
  const { data: institutes, error } = await supabase
    .from("institutes")
    .select();

  if (error) {
    console.log(error);
    return [];
  } else {
    return institutes;
  }
}

export async function getQueuesByInstituteID(id: number) {
  const { data: queues, error } = await supabase
    .from("institute_queues")
    .select()
    .eq("institute_id", id);

  if (error) {
    console.log(error);
    return [];
  } else {
    return queues;
  }
}

export async function updateUnavailableSlotsForQueue(
  id: string,
  unavailableSlots: number[]
) {
  console.log(`Changing unavailable slots to ${unavailableSlots} for id ${id}`);
  const { data, error } = await supabase
    .from("institute_queues")
    .update({ unavailable_slots: unavailableSlots })
    .eq("id", id);

  if (!error) {
    console.log("Slot Booked Successfully");
    return true;
  } else {
    console.log(error);
    return false;
  }
}

export async function createInstituteAndAdmin(adminInfo: adminInfo) {
  console.log(`Creating Institute ${adminInfo.instituteName}`);

  const { error: authError } = await supabase.auth.signUp({
    email: adminInfo.email,
    password: adminInfo.password,
    options: {
      data: {
        role: "admin",
        display_name: adminInfo.displayName,
        address: adminInfo.address,
      },
    },
  });

  if (authError) {
    return { error: authError };
  } else {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;

    const { data, error: instituteError } = await supabase
      .from("institutes")
      .insert([
        {
          institute_name: adminInfo.instituteName,
          address: adminInfo.address,
          email: adminInfo.contactEmail,
          contact_number: adminInfo.contactNumber,
          field: adminInfo.field,
        },
      ])
      .select("institute_id");

    if (instituteError) {
      return { error: instituteError };
    } else {
      const instituteId = data?.[0]?.institute_id;

      const { error } = await supabase.from("institute_admins").insert([
        {
          institute_id: instituteId,
          user_id: userId,
        },
      ]);

      return { error: error };
    }
  }
}

export async function createAdmin(tempAdminInfo: tempAdminInfo) {
  try {
    const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

    if (!currentUser?.id || userError) {
      return { error: new Error("Authentication required") };
    }

    // Get institute_id using single() to enforce unique match
    const { data: adminData, error: adminError } = await supabase
      .from("institute_admins")
      .select("institute_id")
      .eq("user_id", currentUser.id)

    if (adminError || !adminData) {
      return { error: adminError || new Error("Admin institute not found") };
    }

    if (adminData.length > 1) {
      console.warn("Multiple institute associations found, using first entry");
    }

    const instituteId = adminData[0].institute_id;

    // Create new admin account
    const { data: signUpData, error: authError } = await supabase.auth.signUp({
      email: tempAdminInfo.email,
      password: tempAdminInfo.password,
      options: {
        data: {
          role: "admin",
          display_name: tempAdminInfo.displayName,
          address: tempAdminInfo.address,
        },
      },
    });

    if (authError) return { error: authError };
    if (!signUpData.user?.id) return { error: new Error("User creation failed") };

    // Link to institute
    const { error: insertError } = await supabase
      .from("institute_admins")
      .insert([{ 
        institute_id: instituteId, 
        user_id: signUpData.user.id 
      }]);

    return { error: insertError || null };

  } catch (error) {
    console.error("Error in createAdmin:", error);
    return { error: error instanceof Error ? error : new Error("Unknown error") };
  }
}