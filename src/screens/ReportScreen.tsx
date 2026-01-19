import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import BudgetProgress from "../components/BudgetProgress";
import { useTheme } from "../theme/ThemeContext";
import { getExpenses, getCategories, getIncome } from "../utils/storage";
import { useFocusEffect } from '@react-navigation/native';
import Svg, { G, Path } from 'react-native-svg';
import * as d3Shape from 'd3-shape';

type PieData = { key: string; value: number; color: string };

const ReportScreen: React.FC = () => {
  const { colors } = useTheme();

  // CSV export removed per request

  const [pieData, setPieData] = useState<PieData[]>([]);
  const [incomeValue, setIncomeValue] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [budgetTotal, setBudgetTotal] = useState<number>(0);
  const [hasCategories, setHasCategories] = useState<boolean>(false);

  useEffect(() => {
    // keep an initial build for safety
    const buildPie = async () => {
      try {
        const categories = (await getCategories()) || [];
        const expenses = (await getExpenses()) || [];

        const palette = ["#4CAF50","#2196F3","#FF9800","#9C27B0","#F44336","#00BCD4","#8BC34A","#FFB300"];

        let data: PieData[] = [];

        if (!categories || categories.length === 0) {
          // aggregate by expense.category string when no categories configured
          const grouped: Record<string, number> = {};
          expenses.forEach((e: any) => {
            const key = e && e.category ? e.category : 'Uncategorized';
            grouped[key] = (grouped[key] || 0) + Number(e.amount || 0);
          });

          data = Object.keys(grouped).map((k, i) => ({ key: k, value: grouped[k], color: palette[i % palette.length] })).filter(d => d.value > 0);
        } else {
          const sums: Record<string, number> = {};
          categories.forEach((c: any) => (sums[c.id] = 0));
          expenses.forEach((e: any) => {
            if (e && e.category && sums[e.category] !== undefined) sums[e.category] += Number(e.amount || 0);
            // also support matching by name for looser data
            else if (e && e.category) {
              // no-op — category id not found
            }
          });

          data = categories.map((c: any, idx: number) => ({ key: c.id, value: sums[c.id] || 0, color: palette[idx % palette.length] })).filter(d => d.value > 0);
        }

        setPieData(data);

        // compute totals for income vs expenses chart
        try {
          const inc = await getIncome();
          setIncomeValue(inc || 0);
        } catch (e) {
          setIncomeValue(0);
        }

        const totalExp = expenses.reduce((s: number, it: any) => s + Number(it.amount || 0), 0);
        setTotalExpenses(totalExp);

        // compute budget total and whether categories exist
        const budgetSum = (categories || []).reduce((sum: number, item: any) => sum + Number(item.budget || 0), 0);
        setBudgetTotal(budgetSum);
        setHasCategories(Boolean(categories && categories.length > 0));
      } catch (err) {
        console.error('buildPie error', err);
      }
    };
    buildPie();
  }, []);

  // also rebuild when the screen receives focus (expenses/categories may change elsewhere)
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const buildOnFocus = async () => {
        try {
          const categories = (await getCategories()) || [];
          const expenses = (await getExpenses()) || [];
          console.log('ReportScreen focus: categories', categories);
          console.log('ReportScreen focus: expenses', expenses);
          // reuse existing builder by setting state after simple aggregation; call effect builder indirectly
          const palette = ["#4CAF50","#2196F3","#FF9800","#9C27B0","#F44336","#00BCD4","#8BC34A","#FFB300"];
          let data: PieData[] = [];

          if (!categories || categories.length === 0) {
            const grouped: Record<string, number> = {};
            expenses.forEach((e: any) => {
              const key = e && e.category ? e.category : 'Uncategorized';
              grouped[key] = (grouped[key] || 0) + Number(e.amount || 0);
            });
            data = Object.keys(grouped).map((k, i) => ({ key: k, value: grouped[k], color: palette[i % palette.length] })).filter(d => d.value > 0);
          } else {
            const sums: Record<string, number> = {};
            categories.forEach((c: any) => (sums[c.id] = 0));
            expenses.forEach((e: any) => {
              if (e && e.category && sums[e.category] !== undefined) sums[e.category] += Number(e.amount || 0);
            });
            data = categories.map((c: any, idx: number) => ({ key: c.id, value: sums[c.id] || 0, color: palette[idx % palette.length] })).filter(d => d.value > 0);
          }

          if (mounted) setPieData(data);
          const totalExp = expenses.reduce((s: number, it: any) => s + Number(it.amount || 0), 0);
          if (mounted) setTotalExpenses(totalExp);
          // compute budgets on focus as well
          const budgetSum = (categories || []).reduce((sum: number, item: any) => sum + Number(item.budget || 0), 0);
          if (mounted) setBudgetTotal(budgetSum);
          if (mounted) setHasCategories(Boolean(categories && categories.length > 0));
          try {
            const inc = await getIncome();
            if (mounted) setIncomeValue(inc || 0);
          } catch (e) {
            if (mounted) setIncomeValue(0);
          }
        } catch (err) {
          console.error('ReportScreen focus build error', err);
        }
      };
      buildOnFocus();
      return () => { mounted = false; };
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Reports</Text>

      <View style={{ marginTop: 8 }}>
        <BudgetProgress used={totalExpenses} total={budgetTotal} hasCategories={hasCategories} />
      </View>

      {/* Donut chart showing category share */}
      {pieData && pieData.length > 0 ? (
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Svg width={160} height={160}>
            <G x={80} y={80}>
              {(() => {
                const radius = 80;
                const innerRadius = radius * 0.6;
                const pie = d3Shape.pie<PieData>().value((d) => d.value)(pieData as any);
                const arcGen = d3Shape.arc().outerRadius(radius).innerRadius(innerRadius);

                return pie.map((p: any, idx: React.Key | null | undefined) => {
                  const path = arcGen(p) as string;
                  return <Path key={idx} d={path || undefined} fill={pieData[idx].color} />;
                });
              })()}
            </G>
          </Svg>
        </View>
      ) : (
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: colors.secondaryText }}>No category spending to show.</Text>
        </View>
      )}

      {/* Income vs Expenses visual */}
      <View style={[styles.chartCard, { backgroundColor: colors.card, marginTop: 14 }]}> 
        <Text style={[styles.chartTitle, { color: colors.text }]}>Income vs Expenses</Text>
        <View style={styles.ceRow}>
          <Text style={[styles.ceLabel, { color: colors.secondaryText }]}>Income</Text>
          <Text style={[styles.ceValue, { color: colors.text }]}>₹{incomeValue}</Text>
        </View>
        <View style={styles.barBg}><View style={[styles.incomeBar, { width: `${Math.round((incomeValue / Math.max(1, Math.max(incomeValue, totalExpenses))) * 100)}%` }]} /></View>

        <View style={styles.ceRow}>
          <Text style={[styles.ceLabel, { color: colors.secondaryText }]}>Expenses</Text>
          <Text style={[styles.ceValue, { color: colors.text }]}>₹{totalExpenses}</Text>
        </View>
        <View style={styles.barBg}><View style={[styles.expenseBar, { width: `${Math.round((totalExpenses / Math.max(1, Math.max(incomeValue, totalExpenses))) * 100)}%` }]} /></View>
      </View>
      {/* CSV export removed */}
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  exportBtn: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportText: {
    fontWeight: '700',
  },
  chartCard: {
    padding: 12,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  ceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  ceLabel: {
    fontSize: 13,
  },
  ceValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  barBg: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginTop: 6,
    overflow: 'hidden',
  },
  incomeBar: {
    height: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  expenseBar: {
    height: 10,
    backgroundColor: '#F44336',
    borderRadius: 6,
  },
});
