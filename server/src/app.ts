import { EventStore } from "./eventstore/EventStore";
import { v4 } from "uuid";

const eventStore = new EventStore();

const id = v4();

eventStore.commit({
	aggregateId: id,
	data: {
		name: "Testi"
	},
	eventType: "DataStructureCreated"
});

eventStore.commit({
	aggregateId: id,
	data: {
		fieldName: "ilmanpaineet",
		fieldType: "number",
		fieldValue: 2.6
	},
	eventType: "AddDataStructureField"
});

eventStore.commit({
	aggregateId: id,
	data: {
		fieldName: "ilmanpaineet2",
		fieldType: "number",
		fieldValue: 2.6
	},
	eventType: "AddDataStructureField"
});

console.log("id", id);

const now = new Date();

console.log("eventStore", eventStore);

// setTimeout(() => {
// 	const one = v4();
// 	setTimeout(() => {
// 		const two = v4();
// 		setTimeout(() => {
// 			const three = v4();
// 			setTimeout(() => {
// 				const four = v4();

// 				const sorted = [one, two, three, four];
// 				sorted.sort();

// 				console.log("sorted", sorted);
// 			}, 10);
// 		}, 10);
// 	}, 10);
// }, 10);
