import { Colors } from '@pickandtag/domain';
import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  primary: {
    backgroundColor: Colors.primary,
  },

  secondary: {
    backgroundColor: Colors.secondary,
  },

  danger: {
    backgroundColor: Colors.error,
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },

  /* ---------- FAB ---------- */

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  fabWithTextPrimary: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 4,
  },

  fabText: {
    color: Colors.white,
    fontWeight: '600',
  },
});

