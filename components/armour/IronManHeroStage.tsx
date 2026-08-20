import { IronManArmour } from "@/components/armour/IronManArmour";

export function IronManHeroStage() {
  return (
    <div className="iron-man-hero-stage">
      <div className="iron-man-ambient iron-man-ambient-warm" aria-hidden="true" />
      <div className="iron-man-ambient iron-man-ambient-cool" aria-hidden="true" />
      <div className="iron-man-rim-line" aria-hidden="true" />
      <IronManArmour />
      <div className="iron-man-stage-label" aria-hidden="true">
        <span>KJ ARMOUR SYSTEM</span>
        <span>HOVER · FOCUS · TAP HELMET</span>
      </div>
    </div>
  );
}
