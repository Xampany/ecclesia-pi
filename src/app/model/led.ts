/**
 * Eine einzelne Led auf dem Raspberry Pi
 */
export interface Led {
  /**
   * Der 0-basierte Index
   */
  index: number;
  /**
   * Die Farbe als valider CSS String
   */
  color: string;
  /**
   * Die Helligkeit (0 - 1)
   */
  brightness?: number;
}
