import { useCallback, useEffect, useState } from "react";
import { prizes, type Prize } from "@/config/prizes";
import { drawPrize, rotationForIndex } from "@/lib/spin-engine";
import { generateClaimCode } from "@/lib/claim-code";
import { markClaimed, readSpinRecord, writeSpinRecord, type SpinRecord } from "@/lib/spin-storage";

type Status = "loading" | "ready" | "spinning" | "done";

/** Owns all spin state; components stay presentational. */
export function useSpinSession() {
  const [status, setStatus] = useState<Status>("loading");
  const [record, setRecord] = useState<SpinRecord | null>(null);
  const [rotation, setRotation] = useState(0);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  // Detect previous participation before the wheel becomes interactive.
  useEffect(() => {
    const existing = readSpinRecord();
    if (existing) {
      const index = Math.max(0, prizes.findIndex((p) => p.id === existing.prizeId));
      setRecord(existing);
      setRotation(rotationForIndex(index, prizes.length, 0));
      setAlreadyPlayed(true);
      setStatus("done");
      return;
    }
    setStatus("ready");
  }, []);

  const spin = useCallback(() => {
    if (status !== "ready") return;
    const { prize, index } = drawPrize(prizes);
    setStatus("spinning");
    setRotation((prev) => prev + rotationForIndex(index, prizes.length));

    const next: SpinRecord = {
      prizeId: prize.id,
      prizeLabel: prize.label,
      claimCode: prize.isLoss ? null : generateClaimCode(),
      isLoss: Boolean(prize.isLoss),
      spunAt: new Date().toISOString(),
      claimedAt: null,
    };
    writeSpinRecord(next);
    setRecord(next);
  }, [status]);

  const finishSpin = useCallback(() => setStatus("done"), []);
  const claim = useCallback(() => setRecord(markClaimed()), []);

  const prize: Prize | null = record
    ? (prizes.find((p) => p.id === record.prizeId) ?? null)
    : null;

  return { status, record, prize, rotation, alreadyPlayed, spin, finishSpin, claim };
}
