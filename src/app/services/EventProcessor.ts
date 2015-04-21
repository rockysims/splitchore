class EventProcessor {
	processEvents(events: Event[]): computed.SplitchoreState {
		var state: computed.SplitchoreState = {
			tasks: {},
			userBalances: {}
		};

		function ensureTask(taskId: string) {
			if (! state.tasks[taskId]) {
				state.tasks[taskId] = {
					label: "",
					description: "",
					personBids: {},
					period: null,
					completions: [],
					bonusPool: 0,
					currentBounty: 0
				};
			}

			return state.tasks[taskId];
		}

		function handleEditTask(event: EditTaskEvent) {
			var task = ensureTask(event.taskId);

			if (event.label) {
				task.label = event.label;
			}
			if (event.description) {
				task.description = event.description;
			}
			if (event.period) {
				task.period = event.period;
			}
		}

		events.forEach(event => {
			switch (event.eventType) {
				case "EditTaskEvent": handleEditTask(<EditTaskEvent> event); break;
				default: throw new Error("Unhandled event type: " + event.eventType);
			}
		});

		return state;
	}
}

angular.module("splitchore.services")
	.service("EventProcessor", EventProcessor);
