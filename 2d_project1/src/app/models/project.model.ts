import { Simulation } from './simulation.model';

export interface Project {
  name: string;
  date: string;
  expanded: boolean;
  simulations: Simulation[];
}
