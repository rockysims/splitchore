interface SplitchoreInstance {
	label: string;
	description: string;

	users: User[];
	events: Event[];
}

interface User {
	firstName: string;
	lastName: string;
	email: string;
}

interface Event {
	/**
	 * Date that this event is effective. Used as the sorting key for applying events.
	 */
	eventDate: Date;

	/**
	 * The type of event. Should correspond to an interface name.
	 */
	eventType: string;
}

interface TaskEvent extends Event {
	taskId: string;
}

/**
 * Event that creates or modifies a task.
 */
interface EditTaskEvent extends TaskEvent {
	label: string;
	description: string;
	period: TaskPeriod;
}

interface RemoveTaskEvent extends TaskEvent {
}

interface TaskBidEvent extends TaskEvent {
	userId: string;
	amount: number;
}

interface CompleteTaskEvent extends TaskEvent {
	userId: string;
	completionDate: Date;
	notes: string;
}

interface PaymentEvent extends Event {
	userPayments: {[userId: string]: number};
}

interface TaskPeriod {
	periodType: string;
}

interface OncePeriod extends TaskPeriod {
	onceDate: Date;
}

interface RecurringDayPeriod extends TaskPeriod {
	startingDate: Date;
	days: number;
}
