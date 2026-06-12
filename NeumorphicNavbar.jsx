/**
 * NeumorphicNavbar — React Native (Expo)
 *
 * Dependencies:
 *   npx expo install react-native-reanimated @expo/vector-icons
 *   Add "react-native-reanimated/plugin" to babel.config.js plugins[]
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

// ─── Design tokens ────────────────────────────────────────────
const BG         = '#e0e5ec';
const LIGHT_SHD  = '#ffffff';
const DARK_SHD   = '#a3b1c6';
const PRIMARY    = '#015aa6';
const MUTED      = '#8fa3b8';
const NAV_H      = 70;
const PILL_R     = 35;

// ─── Nav items ────────────────────────────────────────────────
const ITEMS = [
  { key: 'home',      label: 'Home',      icon: 'home'    },
  { key: 'products',  label: 'Products',  icon: 'grid'    },
  { key: 'ecosystem', label: 'Ecosystem', icon: 'layers'  },
  { key: 'etome',     label: 'Etome',     icon: 'tablet'  },
  { key: 'about',     label: 'About',     icon: 'info'    },
];

// ─── Spring config ────────────────────────────────────────────
const SPRING = { damping: 14, stiffness: 220, mass: 0.8 };

// ─── Single nav item ──────────────────────────────────────────
const NavItem = React.memo(({ item, isActive, onPress }) => {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn  = () => { scale.value = withSpring(0.88, SPRING); };
  const handlePressOut = () => { scale.value = withSpring(1,    SPRING); };
  const handlePress    = () => { onPress(item.key); };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={styles.item}
      accessibilityRole="button"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View style={[styles.itemInner, animStyle]}>
        {/* Icon bubble — raised when inactive, inset when active */}
        <View style={[styles.bubble, isActive ? styles.bubbleActive : styles.bubbleInactive]}>
          <Feather
            name={item.icon}
            size={20}
            color={isActive ? PRIMARY : MUTED}
          />
        </View>

        {/* Label */}
        <Text style={[styles.label, isActive && styles.labelActive]}>
          {item.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
});

// ─── Navbar ───────────────────────────────────────────────────
/**
 * @param {string}   activeTab    — controlled active key (optional)
 * @param {function} onTabChange  — (key: string) => void
 */
const NeumorphicNavbar = ({ activeTab, onTabChange }) => {
  const [active, setActive] = useState(activeTab ?? 'home');

  const handlePress = useCallback(
    (key) => {
      setActive(key);
      onTabChange?.(key);
    },
    [onTabChange],
  );

  return (
    <View style={styles.root} pointerEvents="box-none">
      {/*
        Neumorphism needs two separate shadow layers.
        iOS supports one shadowColor per view, so we stack two
        transparent sibling views to fake the dual-shadow look.
      */}

      {/* Top-left light shadow */}
      <View style={styles.shadowLight} />

      {/* Bottom-right dark shadow */}
      <View style={styles.shadowDark} />

      {/* Pill surface */}
      <View style={styles.navbar}>
        {ITEMS.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            isActive={active === item.key}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────
const iosShadow = (color, ox, oy, opacity, radius) =>
  Platform.OS === 'ios'
    ? { shadowColor: color, shadowOffset: { width: ox, height: oy }, shadowOpacity: opacity, shadowRadius: radius }
    : {};

const styles = StyleSheet.create({
  /* Outer wrapper — sits at bottom of screen */
  root: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 20,
    height: NAV_H,
  },

  /* Light (top-left) shadow clone */
  shadowLight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: PILL_R,
    backgroundColor: BG,
    ...iosShadow(LIGHT_SHD, -7, -7, 0.9, 12),
  },

  /* Dark (bottom-right) shadow clone */
  shadowDark: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: PILL_R,
    backgroundColor: BG,
    ...iosShadow(DARK_SHD, 7, 7, 0.7, 12),
  },

  /* Main pill */
  navbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: PILL_R,
    backgroundColor: BG,
    paddingHorizontal: 6,
    /* Android fallback */
    elevation: 6,
  },

  /* Each tab touchable */
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },

  itemInner: {
    alignItems: 'center',
    gap: 3,
  },

  /* Icon bubble — raised (extruded) when inactive */
  bubbleInactive: {
    ...iosShadow(LIGHT_SHD, -4, -4, 0.85, 6),
  },

  /* Icon bubble — inset (pressed) when active */
  bubbleActive: {
    backgroundColor: '#d3dae6',   /* slightly darker for inset illusion */
    ...iosShadow(DARK_SHD, 3, 3, 0.55, 5),
  },

  bubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    fontSize: 10,
    fontWeight: '500',
    color: MUTED,
    letterSpacing: 0.2,
  },

  labelActive: {
    color: PRIMARY,
    fontWeight: '700',
  },
});

export default NeumorphicNavbar;

/*
─────────────────────────────────────────────────────────────
  USAGE — in your Expo screen:

  import NeumorphicNavbar from './NeumorphicNavbar';

  export default function App() {
    return (
      <View style={{ flex: 1, backgroundColor: '#e0e5ec' }}>
        <YourScreenContent />
        <NeumorphicNavbar
          activeTab="home"
          onTabChange={(key) => console.log('Navigate to', key)}
        />
      </View>
    );
  }

  babel.config.js:
  module.exports = {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
─────────────────────────────────────────────────────────────
*/
