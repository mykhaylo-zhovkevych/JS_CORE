// Plain counters (not signals), so counting never triggers change itself
// Each component calls one of these functions: one call = Angular checked that view once

export const checks = { legacyBoard: 0, legacyCells: 0, modernBoard: 0, modernCells: 0 };

export function resetChecks() {
    checks.legacyBoard = checks.legacyCells = checks.modernBoard = checks.modernCells = 0;
}

export const countLegacyBoard = () => (checks.legacyBoard++, '');
export const countLegacyCells = () => (checks.legacyCells++, '');
export const countModernBoard = () => (checks.modernBoard++, '');
export const countModernCells = () => (checks.modernCells++, '');
