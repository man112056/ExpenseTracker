import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getCategories, getExpenses } from "../utils/storage";
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from "../theme/ThemeContext";

const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#9C27B0",
  "#F44336",
  "#00BCD4",
  "#8BC34A",
  "#FFB300",
];

const CategoryBreakdown: React.FC = () => {
  const { colors } = useTheme();
  const [categories, setCategories] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const loadData = async () => {
        try {
          const cats = await getCategories();
          const ex = await getExpenses();
          console.log('CategoryBreakdown load: categories', cats);
          console.log('CategoryBreakdown load: expenses', ex);
          if (mounted) {
            setCategories(cats || []);
            setExpenses(ex || []);
          }
        } catch (err) {
          console.error("CategoryBreakdown load error:", err);
        }
      };
      loadData();
      return () => { mounted = false; };
    }, [])
  );

  const calcSpentForCategory = (cat: any) => {
    return expenses
      .filter((e) => e && (e.category === cat.id || e.category === cat.name))
      .reduce((s, i) => s + Number(i.amount || 0), 0);
  };

  if ((!categories || categories.length === 0) && (!expenses || expenses.length === 0)) {
    return null;
  }

  // If categories are not configured, aggregate by expense.category string
  if (!categories || categories.length === 0) {
    const grouped: Record<string, number> = {};
    expenses.forEach((e) => {
      const key = e.category || 'Uncategorized';
      grouped[key] = (grouped[key] || 0) + Number(e.amount || 0);
    });

    const items = Object.keys(grouped).map((k, i) => ({
      id: k,
      name: k,
      budget: 0,
      spent: grouped[k],
      color: COLORS[i % COLORS.length],
    }));

    return (
      <View style={[styles.container, { backgroundColor: colors.card }]}> 
        <Text style={[styles.title, { color: colors.text }]}>Category Breakdown</Text>
        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={[styles.colorBox, { backgroundColor: item.color }]} />
              <View style={styles.info}>
                <View style={styles.infoTop}>
                  <Text style={[styles.catName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.amount, { color: colors.secondaryText }]}>₹{item.spent}</Text>
                </View>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `100%`, backgroundColor: item.color }]} />
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Category Breakdown</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const spent = calcSpentForCategory(item);
          const pct = item.budget > 0 ? Math.min(100, (spent / item.budget) * 100) : 0;
          const color = COLORS[index % COLORS.length];

          return (
            <View style={styles.row}>
              <View style={[styles.colorBox, { backgroundColor: color }]} />
              <View style={styles.info}>
                <View style={styles.infoTop}>
                  <Text style={[styles.catName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.amount, { color: colors.secondaryText }]}>₹{spent} / ₹{item.budget}</Text>
                </View>

                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color }]} />
                </View>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default CategoryBreakdown;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBox: {
    width: 10,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  infoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  catName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  amount: {
    fontSize: 13,
  },
  barBackground: {
    height: 8,
    backgroundColor: "#E6E6E6",
    borderRadius: 6,
    marginTop: 8,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 6,
  },
});
