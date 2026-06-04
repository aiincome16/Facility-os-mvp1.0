export function calculateScoreStatus(score) {
  const value = Number(score || 0);

  if (value >= 85) {
    return "GRUEN";
  }

  if (value >= 60) {
    return "GELB";
  }

  return "ROT";
}

export function calculateEmployeeScore({
  punctuality = 100,
  quality = 100,
  complaints = 0,
  absences = 0,
  replacements = 0
}) {
  let score = 100;

  score -= (100 - punctuality) * 0.3;
  score -= (100 - quality) * 0.3;

  score -= complaints * 5;
  score -= absences * 2;

  score += replacements * 2;

  score = Math.max(
    0,
    Math.min(
      100,
      Math.round(score)
    )
  );

  return {
    score,
    status:
      calculateScoreStatus(
        score
      )
  };
}

export function getScoreLabel(score) {
  const status =
    calculateScoreStatus(
      score
    );

  if (status === "GRUEN") {
    return "Top Mitarbeiter";
  }

  if (status === "GELB") {
    return "Beobachten";
  }

  return "Auffällig";
}

export function getReplacementPriority(employee) {
  if (!employee) {
    return 0;
  }

  let priority =
    Number(employee.Score || 0);

  if (
    employee.Objektkenntnis ===
    "JA"
  ) {
    priority += 15;
  }

  if (
    employee.Auto === "JA"
  ) {
    priority += 10;
  }

  return priority;
}

export function sortReplacementCandidates(
  employees
) {
  return employees.sort(
    (a, b) =>
      getReplacementPriority(
        b
      ) -
      getReplacementPriority(
        a
      )
  );
}