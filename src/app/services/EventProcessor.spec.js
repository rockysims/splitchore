describe('EventProcessor', function () {
	var processor = new EventProcessor();

	it('should handle EditTaskEvents', function () {
		var taskEvent = {
			eventType: "EditTaskEvent",
			eventDate: new Date,
			taskId: "1",
			label: "Test Task",
			description: "A test!",
			period: {
				periodType: "OncePeriod",
				onceDate: new Date
			}
		};

		var state = processor.processEvents([taskEvent]);

		var stateTask = state.tasks[taskEvent.taskId];
		expect(stateTask).toBeTruthy();
		expect(stateTask.label).toBe(taskEvent.label);
	});
});
