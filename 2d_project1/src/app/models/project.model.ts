import { Simulation } from './simulation.model';

export interface Project {
  name: string;
  id: number;
  date: string;
  expanded: boolean;
  simulations: Simulation[];
}
