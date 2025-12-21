export interface Location {
  playerId: number;
  x: number;
  y: number;
}

export interface Position extends Location {
  isDefeated: boolean;
}

export interface Aim extends Location {
  isTarget: boolean;
}

export interface Company {
  title: string;
  locations: Position[];
  aims: Aim[];
}

export interface Battle {
  id: number;
  createdAt: string;
  step: number;
  status: "DRAW" | "LOSE" | "WIN";
  duration: number;
  targetCompany: Company;
  company: Company;
}
