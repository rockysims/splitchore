/**
 * Our own TypeScript mapping for AngularFire. Built from: https://www.firebase.com/docs/web/libraries/angular/api.html
 */
declare module angularfire {
	/**
	 * The $firebaseArray service takes a Firebase reference and returns a JavaScript array which contains the data at the provided Firebase reference. Note that the data will not be available immediately since retrieving it is an asynchronous operation. You can use the $loaded() promise to get notified when the data has loaded.This service automatically keeps this local array in sync with any changes made to the remote Firebase data. This is a PSEUDO READ-ONLY ARRAY suitable for use in directives like ng-repeat and with Angular filters (which expect an array).While using read attributes and methods like length and toString() will work great on this array, you should avoid directly manipulating the array. Methods like splice(), push(), pop(), shift(), unshift(), and reverse() will cause the local data to become out of sync with the server. Instead, utilize the $add(), $remove(), and $save() methods provided by the service to change the structure of the array.
	 */
	export interface ArrayService {
		<T>(firebase: Firebase): FireArray<T>
	}

	export interface ObjectService {
		(firebase: Firebase): FireObject;
	}

	export interface UnregisterFunction {
		(): void
	}

	export interface FireObject {
		/**
		 * The Firebase key where this record is stored. The same as obj.$ref().key().
		 */
		$id: Firebase;

		/**
		 * The priority for this record according to the last update we received. Modifying this value and then calling $save() will also update the server’s priority.
		 *
		 * IMPORTANT NOTE: Because Angular’s $watch() function ignores keys prefixed with $, changing this field inside the $bindTo() function will not trigger an update unless a field without a $ prefix is also updated. It is best to avoid using $bindTo() for editing $ variables and just rely on the $save() method.
		 */
		$priority: any;

		/**
		 * If the value in Firebase is a primitive (boolean, string, or number) then the value will be stored under this $value key. Modifying this value and then calling $save() will also update the server’s value.Note that any time other keys exist, this one will be ignored. To change an object to a primitive value, delete the other keys and add this key to the object. As a shortcut, we can use:
		 * var obj = $firebaseObject(ref); // an object with data keys
		 * $firebaseUtils.updateRec(obj, newPrimitiveValue); // updateRec will delete the other keys for us
		 *
		 *  IMPORTANT NOTE: Because Angular’s $watch() function ignores keys prefixed with $, changing this field inside the $bindTo() function will not trigger an update unless a field without a $ prefix is also updated. It is best to avoid using $bindTo() for editing $ variables and just rely on the $save() method.
		 */
		$value: any;

		/**
		 * Removes the entire object locally and from Firebase. This method returns a promise that will be fulfilled when the data has been removed from the server. The promise will be resolved with a Firebase reference for the exterminated record.
		 */
		$remove(): ng.IPromise<Firebase>;

		/**
		 * If changes are made to data, then calling $save() will push those changes to the server. This method returns a promise that will resolve with this object’s Firebase reference when the write is completed.
		 */
		$save(): ng.IPromise<Firebase>;

		/**
		 * Returns a promise which is resolved when the initial object data has been downloaded from Firebase. The promise resolves to the $firebaseObject itself.
		 * As a shortcut, the resolve() / reject() methods can optionally be passed directly into $loaded():
		 */
		$loaded(): ng.IPromise<ObjectService>;

		/**
		 * Returns the Firebase reference used to create this object.
		 */
		$ref(): Firebase

		/**
		 * Creates a three-way binding between a scope variable and Firebase data. When the scope data is updated, changes are pushed to Firebase, and when changes occur in Firebase, they are pushed instantly into scope. This method returns a promise that resolves after the initial value is pulled from Firebase and set in the scope variable.
		 * We can now bind to any property on our object directly in the HTML, and have it saved instantly to Firebase. Security and Firebase Rules can be used for validation to ensure data is formatted correctly at the server.
		 * Only one scope variable can be bound at a time. If a second attempts to bind to the same $firebaseObject instance, the promise will be rejected and the bind will fail.
		 *
		 * IMPORTANT NOTE: Angular does not report variables prefixed with $ to any $watch() listeners. a simple workaround here is to use a variable prefixed with _, which will not be saved to the server, but will trigger $watch().
		 */
		$bindTo(scope: ng.IScope, varName: string): ng.IPromise<any>

		/**
		 * Registers an event listener which will be notified any time there is a change to the data. Returns an unregister function that, when invoked, will stop notifying the callback of changes.
		 */
		$watch(callback: () => void, context?: any): UnregisterFunction

		/**
		 * Calling this method cancels event listeners and frees memory used by this object (deletes the local data). Changes are no longer synchronized to or from Firebase.
		 */
		$destroy()
	}

	export interface FireArray<T> {
		/**
		 * Creates a new record in Firebase and adds the record to our synchronized array.
		 *
		 * This method returns a promise which is resolved after data has been saved to the server.
		 * The promise resolves to the Firebase reference for the newly added record, providing easy access to its key.
		 */
		$add(newData: T): ng.IPromise<Firebase>

		/**
		 * Remove a record from Firebase and from the local data. This method returns a promise that resolves after the record is deleted at the server. It will contain a Firebase reference to the deleted record. It accepts either an array index or a reference to an item that exists in the array.
		 */
		$remove(record: T): ng.IPromise<Firebase>
		$remove(index: number): ng.IPromise<Firebase>

		/**
		 * The array itself cannot be modified, but records in the array can be updated and saved back to Firebase individually.
		 * This method saves an existing, modified local record back to Firebase.
		 * It accepts either an array index or a reference to an item that exists in the array.
		 * This method returns a promise which is resolved after data has been saved to the server.
		 * The promise resolves to the Firebase reference for the saved record, providing easy access to its key.
		 */
		$save(record: T): ng.IPromise<Firebase>
		$save(index: number): ng.IPromise<Firebase>

		/**
		 * Returns the record from the array for the given key. If the key is not found, returns null. This method utilizes $indexFor(key) to find the appropriate record.
		 */
		$getRecord(key: number): T

		/**
		 * Returns the Firebase key for a record in the array. It accepts either an array index or a reference to an item that exists in the array.
		 */
		$keyAt(record: T): string
		$keyAt(index: number): string

		/**
		 * The inverse of $keyAt(), this method takes a key and finds the associated record in the array. If the record does not exist, -1 is returned.
		 */
		$indexFor(key: string): number

		/**
		 * Returns a promise which is resolved when the initial array data has been downloaded from Firebase.
		 * The promise resolves to the $firebaseArray itself.
		 * The resolve/reject methods may also be passed directly into $loaded:
		 */
		$loaded(): ng.IPromise<FireArray<T>>

		/**
		 * Returns the Firebase reference used to create this array.
		 */
		$ref(): Firebase

		/**
		 * Any callback passed here will be invoked each time data in the array is updated from the server. The callback receives an object with the following keys:
		 */
		$watch(cb: () => void, context?: any): UnregisterFunction

		/**
		 * The Firebase event type which fired (child_added, child_moved, child_removed, or child_changed).
		 */
		event: string

		/**
		 * The ID of the record that triggered the event.
		 */
		key: string

		/**
		 * If event is child_added or child_moved, this contains the previous record’s key or null if key belongs to the first record in the collection.
		 * A common use case for this would be to customize the sorting for a synchronized array. Since each time an add or update arrives from the server, the data could become out of order, we can re-sort on each event. We don’t have to worry about excessive re-sorts slowing down Angular’s compile process, or creating excessive DOM updates, because the events are already batched nicely into a single $apply event (we gather them up and trigger the events in batches before telling $digest to dirty check).
		 */
		prevChild: string

		/**
		 * Stop listening for events and free memory used by this array (empties the local copy). Changes are no longer synchronized to or from Firebase.
		 */
		$destroy()
	}
}
