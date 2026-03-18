import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { markFeatureSets, type MarkFeatureSet } from '@/lib/markFeatureSets';

export function useMarkFeatures(): MarkFeatureSet {
  const { hevMark, separateMarkStyleFromFunction, functionalMark } = useInfoSettingsStore();
  
  // Use functional mark if separation is enabled, otherwise use visual mark
  const activeMark = separateMarkStyleFromFunction ? functionalMark : hevMark;
  
  return markFeatureSets[activeMark] || markFeatureSets['mark-v'];
}
