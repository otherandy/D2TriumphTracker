export class Triumph {
  name: string;                       // Name of the Triumph
  description: string;                // Description of the triumph
  iconPath: string;                   // `https://www.bungie.net${icon}
  scoreValue: number;                 // Triumph's score value
  state: StateMask;                   // Triumph state for visibility and completion
  hash: string;                       // hash string of the current triumph
  objectives: Array<Objective> =
            new Array<Objective>();   // List of objectives for the Triumph

  get triumphComplete(): boolean {    // this verifies if the entire triumph is complete or not
    let complete = true;
    this.objectives.forEach((obj: Objective) => {
      if (obj.completionValue > obj.progress) {
        complete = false;
      }
    });
    return complete;
  }
}

export class Objective {
  // objectiveHash: string;              // Hash value for the objective
  description: string;                // Description of an objective
  allowOvercompletion: boolean;       // Can the triumph gain progress after completion
  progress: number;                   // Player's current progress
  completionValue: number;            // required value for completion of triumph
  // inProgressValueStyle: valueStyle;   // How to display the progress (in progress)
  // completedValueStyle: valueStyle;    // How to display the progress (completed)
  visible: boolean;                   // This is used to tell if an objective is hidden
  // complete: boolean;                  // This tells us if the objective is complete!

  get completionPercent(): number {
    const percent = (this.progress / this.completionValue) * 100;
    return (percent > 100) ? 100 : percent;
  }
}

enum valueStyle {                     // Visual representation of the progress Style
  Integer = 0,
  Percentage,
  Milliseconds,
  Boolean,
  Decimal
}

export class StateMask {              // Bit Mask representing a Triumph's state
  None: boolean;                      // Show as completed and unclaimed!
  RecordRedeemed: boolean;            // Show as completed and claimed!
  RewardUnavailable: boolean;         // This is unimportant to this application
  ObjectiveNotCompleted: boolean;     // Show the objective as incomplete!
  Obscured: boolean;                  // Use the "Obscured Text" for this triumph!
  Invisible: boolean;                 // Hide the triumph if not completed and this is true!
  EntitlementUnowned: boolean;        // This probably isn't important.
  CanEquipTitle: boolean;             // This triumph has a title, and it can be equpped.

  constructor(state: number) {        // This handles running the bitmask to setup the values!
    this.None = (state === 0);
    this.RecordRedeemed = !!(state & 1);
    this.RewardUnavailable = !!(state & 2);
    this.ObjectiveNotCompleted = !!(state & 4);
    this.Obscured = !!(state & 8);
    this.Invisible = !!(state & 16);
    this.EntitlementUnowned = !!(state & 32);
    this.CanEquipTitle = !!(state & 64);
  }
}
