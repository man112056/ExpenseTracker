import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Alert, TextInput } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { launchImageLibrary } from 'react-native-image-picker';
import { getProfileImage, saveProfileImage, getProfile, saveProfile, Profile } from "../utils/storage";

const ProfileScreen = ({ route, navigation }: any) => {
  const { firstTime } = route?.params || {};
  const { theme, toggleTheme, colors } = useTheme();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const uri = await getProfileImage();
        setAvatar(uri);
      } catch (err) {
        console.error('Profile load image', err);
      }

      try {
        const p = await getProfile();
        if (p) {
          setName(p.name || "");
          setMobile(p.mobile || "");
        }
      } catch (err) {
        console.error('Profile load data', err);
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

  const onSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter your name');
      return;
    }

    try {
      const profile: Profile = { name: name.trim(), mobile: mobile.trim() };
      await saveProfile(profile);
      if (firstTime) {
        navigation.replace('MainDrawer');
      } else {
        Alert.alert('Saved', 'Profile updated successfully');
      }
    } catch (err) {
      console.error('save profile error', err);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: avatar || "https://www.gravatar.com/avatar/?d=mp&s=150" }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="Full name"
        placeholderTextColor={colors.secondaryText}
        value={name}
        onChangeText={setName}
        style={[styles.input, { color: colors.text, borderColor: colors.secondaryText }]}
      />

      <TextInput
        placeholder="Mobile number"
        placeholderTextColor={colors.secondaryText}
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        style={[styles.input, { color: colors.text, borderColor: colors.secondaryText }]}
      />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity onPress={onSave} style={[styles.button, { backgroundColor: colors.card }]}> 
        <Text style={{ color: colors.text, fontWeight: '600' }}>{firstTime ? 'Continue' : 'Save'}</Text>
      </TouchableOpacity>
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
  input: {
    width: "90%",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
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
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
