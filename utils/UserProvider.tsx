import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type UserContextType = {
  userID: string | null;
  instituteID: string | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  userID: null,
  instituteID: null,
  loading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [instituteID, setInstituteID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError.message);
        setLoading(false);
        return;
      }

      const id = userData?.user?.id;

      if (id) {
        setUserID(id);

        const { data: adminData, error: adminError } = await supabase
          .from("institute_admins")
          .select("institute_id")
          .eq("user_id", id)
          .single();

        if (adminError) {
          console.error("Error fetching admin data:", adminError.message);
        } else {
          setInstituteID(adminData?.institute_id ?? null);
        }
      }

      setLoading(false);
    };

    fetchUserDetails();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const id = session?.user?.id ?? null;
        setUserID(id);
        setInstituteID(null);

        if (id) {
          supabase
            .from("institute_admins")
            .select("institute_id")
            .eq("user_id", id)
            .single()
            .then(({ data, error }) => {
              if (!error) setInstituteID(data?.institute_id ?? null);
            });
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userID, instituteID, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
