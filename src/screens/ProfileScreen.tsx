import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { launchImageLibrary } from 'react-native-image-picker';
import { getProfileImage, saveProfileImage } from "../utils/storage";

const ProfileScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const uri = await getProfileImage();
        setAvatar(uri);
      } catch (err) {
        console.error('Profile load image', err);
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const res: any = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
      if (res?.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        if (uri) {
          await saveProfileImage(uri);
          setAvatar(uri);
        }
      }
    } catch (err) {
      console.error('pickImage error:', err);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: avatar || "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={[styles.name, { color: colors.text }]}>Manish Kumar</Text>
      <Text style={[styles.contact, { color: colors.secondaryText }]}>+91 9876543210</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contact: {
    fontSize: 14,
    marginVertical: 8,
  },
  row: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginRight: 12,
  },
});
