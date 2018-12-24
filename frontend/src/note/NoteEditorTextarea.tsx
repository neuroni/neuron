import * as React from "react";

import {
	ContentBlock,
	ContentState,
	Editor,
	EditorState,
	genKey
} from "draft-js";

import { UpdatedNoteRow } from "src/types/operation-results-types";

interface INoteEditorTextareaProps {
	delay?: number;
	rows: Array<{
		rowNumber: number;
		text: string;
	}>;
	onChange: (rows: UpdatedNoteRow[]) => void;
}

export class NoteEditorTextarea extends React.Component<
	INoteEditorTextareaProps,
	{
		editorState: EditorState;
	}
> {
	private onChangeTimer: undefined | NodeJS.Timer;
	private updatedRows: Map<number, UpdatedNoteRow>;

	constructor(props) {
		super(props);
		this.updatedRows = new Map<number, UpdatedNoteRow>();

		if (this.props.rows.length === 0) {
			this.state = {
				editorState: EditorState.createEmpty()
			};
			return;
		}

		this.props.rows.sort((a, b) => a.rowNumber - b.rowNumber);

		const blocks: ContentBlock[] = [];

		this.props.rows.forEach(p => {
			const newBlock = new ContentBlock({
				type: "unstyled",
				text: p.text,
				key: genKey()
			});

			blocks.push(newBlock);
		});

		const newContentState = ContentState.createFromBlockArray(blocks);

		this.state = {
			editorState: EditorState.createWithContent(newContentState)
		};
	}

	public handleOnChange() {
		const updatedRows = Array.from(this.updatedRows.values());

		if (this.props.delay) {
			if (this.onChangeTimer) {
				clearTimeout(this.onChangeTimer as NodeJS.Timer);
			}
			this.onChangeTimer = setTimeout(() => {
				if (this.props.onChange && updatedRows.length > 0) {
					this.props.onChange(updatedRows);
					this.updatedRows.clear();
				}
			}, this.props.delay);
		} else {
			if (this.props.onChange && updatedRows.length > 0) {
				this.props.onChange(updatedRows);
				this.updatedRows.clear();
			}
		}
	}

	public handleEditorStateChanged(editorState: EditorState) {
		const oldContent = this.state.editorState.getCurrentContent();

		this.setState({
			editorState
		});

		const newContent = editorState.getCurrentContent();

		const blocksArray = newContent.getBlocksAsArray();
		const oldBlocksArray = oldContent.getBlocksAsArray();

		let maxLength = oldBlocksArray.length;
		if (blocksArray.length > maxLength) {
			maxLength = blocksArray.length;
		}

		let somethingChanged = false;

		for (let i = 0; i < maxLength; i++) {
			const rowNumber = i + 1;
			const oldBlock = oldBlocksArray[i];
			const newBlock = blocksArray[i];

			if (!oldBlock && !newBlock) {
				continue;
			}

			if (!oldBlock) {
				somethingChanged = true;

				const text = newBlock.get("text");

				this.updatedRows.set(rowNumber, {
					rowNumber,
					rowText: text,
					onlyLineChange: text === ""
				});

				continue;
			}

			if (!newBlock) {
				somethingChanged = true;

				this.updatedRows.set(rowNumber, {
					rowNumber,
					lineRemoved: true
				});

				continue;
			}

			const oldText = oldBlock.get("text");
			const newText = newBlock.get("text");

			if (oldText === newText) {
				continue;
			}

			if (newText === "") {
				this.updatedRows.set(rowNumber, {
					rowNumber,
					onlyLineChange: true
				});

				somethingChanged = true;

				continue;
			}

			this.updatedRows.set(rowNumber, {
				rowNumber,
				rowText: newText
			});

			somethingChanged = true;
		}

		return somethingChanged;
	}

	public render() {
		return (
			<div
				style={{
					border: "solid 1px black"
				}}
			>
				<Editor
					editorState={this.state.editorState}
					onChange={editorState => {
						const changed = this.handleEditorStateChanged(
							editorState
						);

						if (!changed) {
							return;
						}

						this.handleOnChange();
					}}
				/>
			</div>
		);
	}
}
