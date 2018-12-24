import * as React from "react";

import {
	ContentBlock,
	ContentState,
	Editor,
	EditorState,
	genKey
} from "draft-js";

import { List } from "immutable";

interface IUpdatedRow {
	rowNumber: number;
	rowText: string;
}

interface INoteEditorTextareaProps {
	delay?: number;
	rows: Array<{
		rowNumber: number;
		text: string;
	}>;
	onChange: (rows: IUpdatedRow[]) => void;
}

export class NoteEditorTextarea extends React.Component<
	INoteEditorTextareaProps,
	{
		updatedRows: Array<{ rowNumber: number; rowText: string }>;
		editorState: EditorState;
	}
> {
	private onChangeTimer: undefined | NodeJS.Timer;

	constructor(props) {
		super(props);
		// tslint:disable-next-line
		console.log("constoajnt");

		const editorState = EditorState.createEmpty();
		const contentState = editorState.getCurrentContent();
		let blockMap = contentState.getBlockMap();

		this.props.rows.forEach(p => {
			const newBlock = new ContentBlock({
				key: genKey(),
				type: "unstyled",
				text: p.text,
				characterList: List()
			});

			blockMap = blockMap.set(newBlock.get("key"), newBlock);
		});

		// tslint:disable-next-line
		console.log("blockMap", blockMap.toObject());

		this.state = {
			updatedRows: [],
			editorState: EditorState.push(
				editorState,
				ContentState.createFromBlockArray(blockMap.toArray()),
				"change-block-data"
			)
		};
	}

	// public componentWillReceiveProps(newProps: INoteEditorTextareaProps) {
	// 	const editorState = EditorState.createEmpty();
	// 	const contentState = editorState.getCurrentContent();
	// 	let blockMap = contentState.getBlockMap();

	// 	this.props.rows.forEach(p => {
	// 		const newBlock = new ContentBlock({
	// 			key: genKey(),
	// 			type: "unstyled",
	// 			text: p.text,
	// 			characterList: List()
	// 		});

	// 		blockMap = blockMap.set(newBlock.get("key"), newBlock);
	// 	});

	// 	// tslint:disable-next-line
	// 	console.log("blockMap", blockMap.toObject());

	// 	this.setState({
	// 		editorState: EditorState.push(
	// 			editorState,
	// 			ContentState.createFromBlockArray(blockMap.toArray()),
	// 			"change-block-data"
	// 		)
	// 	});
	// }

	public handleOnChange() {
		if (this.props.delay) {
			if (this.onChangeTimer) {
				clearTimeout(this.onChangeTimer as NodeJS.Timer);
			}
			this.onChangeTimer = setTimeout(() => {
				if (this.props.onChange && this.state.updatedRows.length > 0) {
					this.props.onChange(this.state.updatedRows);
					this.setState({
						updatedRows: []
					});
				}
			}, this.props.delay);
		} else {
			if (this.props.onChange && this.state.updatedRows.length > 0) {
				this.props.onChange(this.state.updatedRows);
				this.setState({
					updatedRows: []
				});
			}
		}
	}

	public handleEditorStateChanged(editorState: EditorState) {
		this.setState({
			editorState
		});

		const selection = editorState.getSelection();
		const content = editorState.getCurrentContent();
		const blocksArray = content.getBlocksAsArray();
		const oldBlocksMap = this.state.editorState
			.getCurrentContent()
			.getBlockMap();

		const anchorKey = selection.get("anchorKey");

		let rowNumber = 1;
		for (const block of blocksArray) {
			const key = block.get("key");

			if (key !== anchorKey) {
				rowNumber++;
				continue;
			}

			const rowText = block.get("text");
			const oldRowText = oldBlocksMap.get(key)
				? oldBlocksMap.get(key).get("text")
				: "";

			if (oldRowText === rowText) {
				return false;
			}

			const updatedRow = {
				rowNumber,
				rowText
			};

			const newUpdatedRows = this.state.updatedRows.filter(
				p => p.rowNumber !== rowNumber
			);

			newUpdatedRows.push(updatedRow);

			this.setState({
				updatedRows: newUpdatedRows
			});

			return true;
		}

		return false;
	}

	public render() {
		return (
			<Editor
				editorState={this.state.editorState}
				onChange={editorState => {
					const changed = this.handleEditorStateChanged(editorState);

					if (!changed) {
						return;
					}

					this.handleOnChange();
				}}
			/>
		);
	}
}
