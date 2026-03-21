// components/sections/ImpactSection.tsx
// SERVER COMPONENT

import ImpactClient from "./Impactclient";
import { IMPACT_METRICS, SYSTEM_CAPABILITIES } from "@/data/impact";

export default function ImpactSection() {
  return (
    <ImpactClient metrics={IMPACT_METRICS} capabilities={SYSTEM_CAPABILITIES} />
  );
}
