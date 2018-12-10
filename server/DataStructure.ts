import { Record } from "immutable";

// interface IDataStructure {}

// const createDataStructure = (props: IDataStructure) => {};

// const DataStructure = Record<{
//   name: string;
// }>({
//   name: ""
// });

class DataStructure extends Record<{
	name: string;
}>({
	name: ""
}) {
	constructor(args) {
		super(args);
		console.log("constructor");
	}
}

const datas = new DataStructure({
	name: "testi"
});

console.log("datas", datas);

// datas.

// const createDataStructure = (args: DataStructure) => {
// 	return new DataStructure({
// 		name: name
// 	});
// };

// const dat = createDataStructure("dat");

// console.log("dat", dat);

// const newDataStructure = new DataStructure({
//   name: "Ilmanpaineet"
// });

// console.log("newDataSturcture", newDataStructure);
