module computed {
	export interface SplitchoreState {
		tasks: {[taskId: string]: computed.Task};
		userBalances: {[userId: string]: number};
	}

	export interface Task {
		label: String;
		description: String;
		personBids: { [personId: string]: TaskBid };

		/**
		 * Definition of when and how often this task is available.
		 */
		period: TaskPeriod;

		/**
		 * List of times this task was completed.
		 */
		completions: TaskCompletion[];

		/**
		 * The amount of bonus money currently available for this task.
		 */
		bonusPool: number;

		currentBounty: number;
	}

	/**
	 * Holds a person's bid on a particular task.
	 */
	export interface TaskBid {
		datePlaced: Date;

		/**
		 * Amount the person is willing to pay for a task's completion.
		 */
		amount: number;
	}

	/**
	 * Holds information about the completion of a task.
	 */
	export interface TaskCompletion {
		userId: string;
		completionDate: Date;
		notes: string;
	}
}
