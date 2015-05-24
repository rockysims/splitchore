Split Chore
====================

Design Goal
---------------------

Splitchore aims to encourage people in a household to complete basic household chores. It gives each person
a change to put a "bounty" on the completion of a chore on a certain schedule. If everyone contributes equally,
all the bounties will be returned.

If someone does not contribute, they will lose their bounties, giving other people an opportunity to earn those
bounties for completing the chore.

By design, it should **always** be possible to make back your money *for the current period*. If a task is not
done past it's due date, it will be fair game for the first person who wishes to complete it.
 

Basic Design
---------------------

### Groups and Login
Splitchore works with groups of people, identified by their e-mail addresses, and who can login using Google/Facebook/etc...

Each group has a set of tasks which the group would like to see completed.

### Tasks
1. A name and description
2. A period defining how often the task repeats
3. A bounty, specified per person. This is the amount of money having the task done is worth to the person
4. A "bonus pool" which builds up when a task is not completed in it's period. Completing the task earns the bonus pool and resets it to zero.

### Rules

1. The **current pool**, being the cash available to be claimed not counting extra bonus, is the sum of all value of all tasks

2. A person’s **total bounty** is the sum of all their bounties for all current tasks

3. A person's **bounty earnings** is the sum of all their *non-bonus pool* earnings for current tasks
 
4. A person's **bonus earnings** is the sum of all their *bonus pool* earnings for current tasks

5. A person's **bounty earnings** must not exceed their **total bounty**

6. If a person completes a task whose bounty would allow them to violate ** rule 5 ** , the excess bounty is refunded proportionally

7. If an uncompleted task rolls over to it's next period, it's bounty is added to it's bounus pool 


Original Notes
====================

all users must login with email to begin

task list has items:
	name, bounty, interval (days), current bounty

admin
	list of tasks
		blank row at bottom to create new
		delete task button

user
	list of groups (splitwise groups) which leads to:
		task list (order by current bounty)
		onClickTask, task completion page
		
task completion page
	list of people (you are selected by default)
		click to select/deselect
	complete task button
		onClick:
			1) create splitwise expense for current bounty amount
				to selected people (who helped complete the task) and split equally among them
				from unselected people in splitwise group split equally
			2) set current bounty to 0

mongoDB
node.js
iPhone friendly web page


SPLITCHORE MORE:

tasks
	period
	per person bid

current pool (cash available to be claimed not counting extra bonus)
	sum of all value of all tasks

person’s max withdrawal amount
	the sum of all their bids for all tasks (most recent iteration of each task without extra bounty)

the sum of the bounties of all current tasks the person has done cannot exceed the sum of their bids for all tasks

if a person does a task that is more than the current amount they can withdraw, all other bidders are refunded (proportional refund)

when an incomplete task has its period expire, its value is added to its bonus pot

design in such a way that algorithm to calculate value of available tasks and things is calculated from list of events (tasks done and task bids changed)
	and the algorithms should be abstracted out

———————————————————————————————————————————————


project setup todo:
yeoman angular
type script
firebase
gulp
bower
bootstrap
hello world (persist text box to firebase)
write firebase authentication
