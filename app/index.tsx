// app/index.tsx
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/config/supabase";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
     const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        router.replace("/(tabs)");
        } else {
        router.replace("/login");
}
    };
    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a1a" }}>
      <ActivityIndicator size="large" color="#fbbf24" />
    </View>
  );
}
